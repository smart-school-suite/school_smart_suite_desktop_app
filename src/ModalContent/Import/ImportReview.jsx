import { CircleAlert, CircleCheck, Info, TriangleAlert } from "lucide-react";
import { useMemo, useState } from "react";
import EmptyState, { EmptyStateButton } from "../../components/errors/EmptyState";
import SearchInput from "../../components/input/search";
import Table from "../../components/Tables/Tables";
import { useDebounce } from "../../hooks/common/useDebounce";
import { reviewRows, rowMatches, splitColumns } from "../../utils/file/importSpreadsheet";

const STATUS = {
  ready: { label: "Ready", dot: "bg-fern-500", text: "text-fern-700" },
  warning: { label: "Missing optional", dot: "bg-old-lace-500", text: "text-old-lace-800" },
  error: { label: "Will be skipped", dot: "bg-red-500", text: "text-red-700" },
};

function StatusCell({ data }) {
  const status = STATUS[data?.__status] ?? STATUS.ready;
  const detail = [...(data?.__errors ?? []), ...(data?.__warnings ?? [])];
  return (
    <span
      className={`d-inline-flex align-items-center gap-2 font-size-xs ${status.text}`}
      title={detail.length ? `Missing: ${detail.join(", ")}` : undefined}
    >
      <span className={`rounded-circle flex-shrink-0 ${status.dot}`} style={{ width: 7, height: 7 }} />
      <span className="text-truncate">{status.label}</span>
    </span>
  );
}

/** Text cut to the column with "…", the full value on hover; empty shows a dash. */
function TextCell({ value, align = "start" }) {
  const text = String(value ?? "").trim();
  if (!text) return <span className={`text-iron-300 d-block w-100 text-${align}`}>—</span>;
  return (
    <span className={`text-truncate d-block w-100 text-${align}`} title={text}>
      {text}
    </span>
  );
}

/** Repeatable group values ("Lecture Hall, Exam Hall") as chips: two shown, the rest as "+N". */
function ChipsCell({ value }) {
  const items = String(value ?? "")
    .split(/\s*[,|]\s*/)
    .map((item) => item.trim())
    .filter(Boolean);
  if (items.length === 0) return <span className="text-iron-300">—</span>;
  const shown = items.slice(0, 2);
  return (
    <span className="d-flex flex-row align-items-center gap-1 overflow-hidden" title={items.join(", ")}>
      {shown.map((item, index) => (
        <span key={`${item}-${index}`} className="rounded-pill px-2 bg-iron-100 text-iron-700 text-truncate font-size-xs" style={{ lineHeight: 1.8, maxWidth: "10rem" }}>
          {item}
        </span>
      ))}
      {items.length > shown.length && (
        <span className="text-iron-500 font-size-xs flex-shrink-0">+{items.length - shown.length}</span>
      )}
    </span>
  );
}

/** A column whose filled values are all numbers is right-aligned, like numbers in a spreadsheet. */
const isNumericColumn = (rows, field) => {
  const values = rows.map((row) => String(row[field] ?? "").trim()).filter(Boolean);
  return values.length > 0 && values.every((value) => /^-?[\d\s,]*\.?\d+$/.test(value));
};

/** Columns of the preview, built from the module's fields so they always match what is imported. */
const previewColumns = (columns, mapping, rows) => {
  const { fields, groups } = splitColumns(columns);
  return [
    {
      field: "__row",
      headerName: "Row",
      width: 70,
      flex: 0,
      pinned: "left",
      sortable: true,
      cellClass: "text-iron-500 import-preview__cell--end",
      headerClass: "import-preview__header--end",
    },
    { field: "__status", headerName: "Status", width: 150, flex: 0, pinned: "left", cellRenderer: StatusCell, sortable: true },
    ...fields
      .filter((field) => mapping.standardFields?.[field.program_name]?.value)
      .map((field) => {
        const numeric = isNumericColumn(rows, field.program_name);
        return {
          field: field.program_name,
          headerName: field.label,
          minWidth: numeric ? 110 : 160,
          flex: numeric ? 0.6 : 1,
          sortable: true,
          cellRenderer: TextCell,
          ...(numeric && {
            cellClass: "import-preview__cell--end",
            headerClass: "import-preview__header--end",
            cellRendererParams: { align: "end" },
          }),
        };
      }),
    ...groups.map((group) => ({ field: group.program_name, headerName: group.label, minWidth: 200, flex: 1.2, cellRenderer: ChipsCell })),
  ];
};

/**
 * Step 3: see the rows as they will be imported. Counts double as filters,
 * so problems are one click away, and the search covers every column.
 * Rows that will be skipped are imported anyway by the others; the job's
 * report lists them by reason afterwards.
 */
export default function ImportReview({ wizard, module }) {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 250);

  const rows = useMemo(
    () => reviewRows(wizard.sheet?.rows ?? [], wizard.mapping, wizard.columns),
    [wizard.sheet, wizard.mapping, wizard.columns],
  );
  const colDefs = useMemo(() => previewColumns(wizard.columns, wizard.mapping, rows), [wizard.columns, wizard.mapping, rows]);

  const counts = useMemo(
    () => rows.reduce((acc, row) => ({ ...acc, [row.__status]: (acc[row.__status] ?? 0) + 1 }), { ready: 0, warning: 0, error: 0 }),
    [rows],
  );

  const visible = useMemo(
    () => rows.filter((row) => (filter === "all" || row.__status === filter) && rowMatches(row, debouncedQuery)),
    [rows, filter, debouncedQuery],
  );

  const filters = [
    { key: "all", label: "All rows", count: rows.length, icon: Info },
    { key: "ready", label: "Ready", count: counts.ready, icon: CircleCheck },
    { key: "warning", label: "Missing optional", count: counts.warning, icon: TriangleAlert },
    { key: "error", label: "Will be skipped", count: counts.error, icon: CircleAlert },
  ];
  const importable = counts.ready + counts.warning;
  const moduleName = module?.name?.toLowerCase() ?? "records";

  return (
    <div className="d-flex flex-column gap-3 h-100" style={{ minHeight: 0 }}>
      <div className="d-flex flex-column gap-1">
        <span className="fw-semibold">
          {importable === rows.length
            ? `All ${rows.length.toLocaleString()} rows are ready to import`
            : `${importable.toLocaleString()} of ${rows.length.toLocaleString()} rows are ready to import`}
        </span>
        {counts.error > 0 && (
          <span className="text-iron-600">
            {counts.error.toLocaleString()} {counts.error === 1 ? "row misses" : "rows miss"} a required value and will be skipped. Fix them in the file and import them later.
          </span>
        )}
        <span className="text-iron-500 font-size-xs">
          The server also checks for duplicates and unknown values; the job report lists any {moduleName} it could not add.
        </span>
      </div>

      <div className="d-flex flex-row flex-wrap gap-2" role="tablist" aria-label="Filter rows by status">
        {filters.map(({ key, label, count, icon: FilterIcon }) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={filter === key}
            className={`import-filter font-size-sm d-flex flex-row align-items-center gap-1 ${filter === key ? "import-filter--active" : ""}`}
            onClick={() => setFilter(key)}
            disabled={key !== "all" && count === 0}
          >
            <FilterIcon size={13} /> {label} <span className="fw-semibold">{count.toLocaleString()}</span>
          </button>
        ))}
      </div>

      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder={`Search ${rows.length.toLocaleString()} rows`}
        resultCount={rows.length}
        enableShortcut={false}
        disabled={rows.length === 0}
      />
      {(debouncedQuery || filter !== "all") && visible.length > 0 && (
        <span className="text-iron-500 font-size-xs" aria-live="polite">
          Showing {visible.length.toLocaleString()} of {rows.length.toLocaleString()} rows
        </span>
      )}

      <div className="flex-grow-1" style={{ minHeight: "16rem" }}>
        {visible.length === 0 ? (
          <EmptyState
            mascot="notFound"
            height="16rem"
            mascotHeight="6rem"
            title="No rows to show"
            description={debouncedQuery ? `No row matches "${debouncedQuery}".` : "No row has this status."}
            actions={
              <EmptyStateButton
                variant="secondary"
                onClick={() => {
                  setQuery("");
                  setFilter("all");
                }}
              >
                Show all rows
              </EmptyStateButton>
            }
          />
        ) : (
          <div className="import-preview" style={{ height: "22rem" }}>
            <Table colDefs={colDefs} rowData={visible} selectable={false} rowHeight={40} />
          </div>
        )}
      </div>
    </div>
  );
}

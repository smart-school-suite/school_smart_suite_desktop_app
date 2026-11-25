import { CircleAlert, CircleCheck, Info, TriangleAlert } from "lucide-react";
import { useMemo, useState } from "react";
import EmptyState, { EmptyStateButton } from "../../components/errors/EmptyState";
import SearchInput from "../../components/input/search";
import Table from "../../components/Tables/Tables";
import { useDebounce } from "../../hooks/common/useDebounce";
import { reviewRows, rowMatches, splitColumns } from "../../utils/file/importSpreadsheet";

const STATUS = {
  ready: { label: "Ready", className: "bg-fern-50 text-fern-700" },
  warning: { label: "Missing optional", className: "bg-old-lace-50 text-old-lace-800" },
  error: { label: "Will be skipped", className: "bg-red-50 text-red-700" },
};

function StatusCell({ data }) {
  const status = STATUS[data?.__status] ?? STATUS.ready;
  const detail = [...(data?.__errors ?? []), ...(data?.__warnings ?? [])];
  return (
    <span
      className={`d-inline-block rounded-pill px-2 font-size-xs ${status.className}`}
      style={{ lineHeight: 1.8 }}
      title={detail.length ? `Missing: ${detail.join(", ")}` : undefined}
    >
      {status.label}
    </span>
  );
}

/** Columns of the preview, built from the module's fields so they always match what is imported. */
const previewColumns = (columns, mapping) => {
  const { fields, groups } = splitColumns(columns);
  return [
    { field: "__row", headerName: "Row", width: 80, flex: 0, pinned: "left", sortable: true },
    { field: "__status", headerName: "Status", width: 160, flex: 0, cellRenderer: StatusCell, sortable: true },
    ...fields
      .filter((field) => mapping.standardFields?.[field.program_name]?.value)
      .map((field) => ({ field: field.program_name, headerName: field.label, minWidth: 140, flex: 1, tooltipField: field.program_name })),
    ...groups.map((group) => ({ field: group.program_name, headerName: group.label, minWidth: 180, flex: 1, tooltipField: group.program_name })),
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
  const colDefs = useMemo(() => previewColumns(wizard.columns, wizard.mapping), [wizard.columns, wizard.mapping]);

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
        <span className="fw-semibold">Check the rows before importing</span>
        <span className="text-iron-500">
          {importable === rows.length
            ? `All ${rows.length.toLocaleString()} rows have what they need.`
            : `${importable.toLocaleString()} of ${rows.length.toLocaleString()} rows can be imported. ${counts.error.toLocaleString()} ${counts.error === 1 ? "misses" : "miss"} a required value and will be skipped; fix them in the file and import them later.`}{" "}
          The server also checks for duplicates and unknown values; the job report will list any {moduleName} it could not add, grouped by reason.
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
          <div style={{ height: "22rem" }}>
            <Table colDefs={colDefs} rowData={visible} selectable={false} />
          </div>
        )}
      </div>
    </div>
  );
}

import { CircleAlert, CircleCheck, Plus, RotateCcw, Sparkles, Trash2, TriangleAlert } from "lucide-react";
import { useMemo, useState } from "react";
import EmptyState, { EmptyStateButton } from "../../components/errors/EmptyState";
import ColumnSelect from "../../components/Import/ColumnSelect";
import SearchInput from "../../components/input/search";
import { useDebounce } from "../../hooks/common/useDebounce";
import {
  groupMax,
  groupMin,
  headerUsage,
  isGroupRequired,
  splitColumns,
} from "../../utils/file/importSpreadsheet";

/** First non-empty value of each column, shown next to it so it is recognisable. */
const sampleValues = (sheet) => {
  const samples = {};
  (sheet?.headers ?? []).forEach((header) => {
    const row = (sheet?.rows ?? []).slice(0, 50).find((item) => String(item[header] ?? "").trim() !== "");
    if (row) samples[header] = String(row[header]).slice(0, 40);
  });
  return samples;
};

const matches = (words, ...texts) => {
  const text = texts.filter(Boolean).join(" ").toLowerCase();
  return words.every((word) => text.includes(word));
};

/**
 * Step 2: say which column of the file fills each field.
 *
 * Columns are matched automatically first, so most people only check the
 * result. Required fields come first and anything still missing is
 * highlighted and listed in the footer; the next step stays locked until it
 * is fixed.
 */
export default function ImportColumnMatch({ wizard, module }) {
  const [query, setQuery] = useState("");
  const [onlyAttention, setOnlyAttention] = useState(false);
  const debouncedQuery = useDebounce(query, 250);
  const words = String(debouncedQuery).toLowerCase().split(/\s+/).filter(Boolean);

  const { fields, groups } = useMemo(() => splitColumns(wizard.columns), [wizard.columns]);
  const headers = wizard.sheet?.headers ?? [];
  const samples = useMemo(() => sampleValues(wizard.sheet), [wizard.sheet]);
  const usage = useMemo(() => headerUsage(wizard.mapping, wizard.columns), [wizard.mapping, wizard.columns]);
  const problemKeys = useMemo(() => new Set(wizard.problems.map((problem) => problem.key)), [wizard.problems]);

  const fieldValue = (field) => wizard.mapping.standardFields?.[field.program_name]?.value ?? "";
  const needsAttention = (field) => field.required && !fieldValue(field);

  const visibleFields = fields.filter(
    (field) =>
      (!onlyAttention || needsAttention(field)) &&
      matches(words, field.label, field.program_name, fieldValue(field)),
  );
  const requiredFields = visibleFields.filter((field) => field.required);
  const optionalFields = visibleFields.filter((field) => !field.required);
  const visibleGroups = groups.filter(
    (group) =>
      (!onlyAttention || problemKeys.has(group.program_name)) &&
      matches(words, group.label, group.program_name, ...(group.fields ?? []).map((field) => field.label)),
  );

  const matchedFields = fields.filter((field) => fieldValue(field)).length;
  const autoMatched = fields.filter((field) => wizard.mapping.standardFields?.[field.program_name]?.auto).length;
  const total = fields.length;
  const nothingVisible = visibleFields.length === 0 && visibleGroups.length === 0;

  return (
    <div className="d-flex flex-column gap-3">
      <div className="d-flex flex-row align-items-start justify-content-between gap-3">
        <div className="d-flex flex-column gap-1">
          <span className="fw-semibold">Match the columns of your file</span>
          <span className="text-iron-500">
            {autoMatched > 0
              ? `${autoMatched} of ${total} fields were matched for you. Check them and fill in the rest.`
              : `Choose which column of "${wizard.sheet?.info?.name}" fills each ${module?.name?.toLowerCase() ?? ""} field.`}
          </span>
        </div>
        <button type="button" onClick={wizard.rematch} className="border rounded-3 bg-white px-2 py-1 font-size-sm d-flex flex-row align-items-center gap-1 flex-shrink-0" title="Match the columns again from their names">
          <RotateCcw size={13} /> Match again
        </button>
      </div>

      <MatchProgress matched={matchedFields} total={total} problems={wizard.problems} />

      <div className="d-flex flex-row align-items-center gap-2">
        <div className="flex-grow-1">
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder={`Search ${total + groups.length} fields`}
            enableShortcut={false}
          />
        </div>
        <button
          type="button"
          className={`import-filter font-size-sm d-flex flex-row align-items-center gap-1 flex-shrink-0 ${onlyAttention ? "import-filter--active" : ""}`}
          onClick={() => setOnlyAttention((current) => !current)}
          aria-pressed={onlyAttention}
          disabled={wizard.problems.length === 0 && !onlyAttention}
        >
          <CircleAlert size={13} /> Needs attention{wizard.problems.length > 0 ? ` · ${wizard.problems.length}` : ""}
        </button>
      </div>

      {nothingVisible ? (
        <EmptyState
          mascot={onlyAttention && !words.length ? "empty" : "notFound"}
          height="14rem"
          mascotHeight="6rem"
          title={onlyAttention && !words.length ? "Nothing needs attention" : "No field matches your search"}
          description={onlyAttention && !words.length ? "Every required field has a column." : `Nothing matches "${debouncedQuery}".`}
          actions={
            <EmptyStateButton
              variant="secondary"
              onClick={() => {
                setQuery("");
                setOnlyAttention(false);
              }}
            >
              Show all fields
            </EmptyStateButton>
          }
        />
      ) : (
        <>
          {requiredFields.length > 0 && (
            <FieldSection title="Required" hint="These must have a column.">
              {requiredFields.map((field) => (
                <FieldRow key={field.program_name} field={field} entry={wizard.mapping.standardFields?.[field.program_name]} headers={headers} samples={samples} usage={usage} onChange={(header) => wizard.setField(field.program_name, header)} />
              ))}
            </FieldSection>
          )}

          {visibleGroups.map((group) => (
            <GroupCard key={group.program_name} group={group} wizard={wizard} headers={headers} samples={samples} usage={usage} hasProblem={problemKeys.has(group.program_name)} />
          ))}

          {optionalFields.length > 0 && (
            <FieldSection title="Optional" hint="Leave a field without a column to skip it.">
              {optionalFields.map((field) => (
                <FieldRow key={field.program_name} field={field} entry={wizard.mapping.standardFields?.[field.program_name]} headers={headers} samples={samples} usage={usage} onChange={(header) => wizard.setField(field.program_name, header)} />
              ))}
            </FieldSection>
          )}
        </>
      )}
    </div>
  );
}

function MatchProgress({ matched, total, problems }) {
  const percent = total > 0 ? Math.round((matched / total) * 100) : 100;
  const done = problems.length === 0;
  return (
    <div className={`rounded-4 p-3 d-flex flex-column gap-2 ${done ? "bg-fern-50" : "bg-old-lace-50"}`} role="status">
      <div className="d-flex flex-row align-items-center justify-content-between gap-2">
        <span className={`fw-semibold d-flex flex-row align-items-center gap-2 ${done ? "text-fern-700" : "text-old-lace-800"}`}>
          {done ? <CircleCheck size={16} /> : <CircleAlert size={16} />}
          {done ? "All required fields have a column" : `${problems.length} ${problems.length === 1 ? "thing" : "things"} to fix before you can continue`}
        </span>
        <span className="text-iron-600 font-size-xs flex-shrink-0">{matched} of {total} fields matched</span>
      </div>
      <div className="rounded-pill bg-white overflow-hidden" style={{ height: 6 }}>
        <div className={`h-100 rounded-pill ${done ? "bg-fern-500" : "bg-old-lace-500"}`} style={{ width: `${percent}%`, transition: "width 0.3s ease" }} />
      </div>
      {!done && (
        <ul className="m-0 ps-3 text-old-lace-800 font-size-xs">
          {problems.slice(0, 4).map((problem) => (
            <li key={`${problem.key}-${problem.message}`}>{problem.message}</li>
          ))}
          {problems.length > 4 && <li>and {problems.length - 4} more</li>}
        </ul>
      )}
    </div>
  );
}

function FieldSection({ title, hint, children }) {
  return (
    <section className="d-flex flex-column gap-2">
      <div className="d-flex flex-row align-items-baseline gap-2">
        <span className="fw-semibold">{title}</span>
        <span className="text-iron-500 font-size-xs">{hint}</span>
      </div>
      <div className="d-flex flex-column gap-2">{children}</div>
    </section>
  );
}

function FieldStatus({ required, value, auto }) {
  if (value) {
    return (
      <span className="d-flex flex-row align-items-center gap-1 text-fern-600 font-size-xs">
        {auto ? <Sparkles size={12} /> : <CircleCheck size={12} />}
        {auto ? "Matched automatically" : "Matched"}
      </span>
    );
  }
  return required ? (
    <span className="d-flex flex-row align-items-center gap-1 text-red-600 font-size-xs">
      <CircleAlert size={12} /> Choose a column
    </span>
  ) : (
    <span className="text-iron-500 font-size-xs">Not imported</span>
  );
}

function FieldRow({ field, entry, headers, samples, usage, onChange, labelSuffix = "", usageLabel }) {
  const value = entry?.value ?? "";
  const missing = field.required && !value;
  // How headerUsage names this field, to leave it out of "same column as".
  const ownLabel = usageLabel ?? field.label;
  const sharedWith = value ? (usage[value] ?? []).filter((label) => label !== ownLabel) : [];
  return (
    <div className={`import-field d-flex flex-row align-items-center justify-content-between gap-3 px-3 py-2 ${missing ? "import-field--missing" : ""}`}>
      <div className="d-flex flex-column" style={{ minWidth: 0 }}>
        <span className="fw-medium text-truncate">
          {field.label}
          {labelSuffix}
          {field.required && <span className="text-red-500 ms-1" aria-hidden="true">*</span>}
        </span>
        <FieldStatus required={field.required} value={value} auto={entry?.auto} />
        {sharedWith.length > 0 && (
          <span className="d-flex flex-row align-items-center gap-1 text-old-lace-700 font-size-xs">
            <TriangleAlert size={12} /> Same column as {sharedWith.join(", ")}
          </span>
        )}
      </div>
      <div className="flex-shrink-0" style={{ width: "min(16rem, 50%)" }}>
        <ColumnSelect label={field.label} value={value} headers={headers} samples={samples} usage={usage} onChange={onChange} />
      </div>
    </div>
  );
}

function GroupCard({ group, wizard, headers, samples, usage, hasProblem }) {
  const instances = wizard.mapping.repeatableGroups?.[group.program_name] ?? [];
  const max = groupMax(group);
  const min = groupMin(group);
  const required = isGroupRequired(group);

  return (
    <section className={`border rounded-4 p-3 d-flex flex-column gap-3 bg-white ${hasProblem ? "border-danger-subtle" : ""}`}>
      <div className="d-flex flex-row align-items-start justify-content-between gap-2">
        <div className="d-flex flex-column gap-1">
          <span className="fw-semibold">
            {group.label}
            {required && <span className="text-red-500 ms-1" aria-hidden="true">*</span>}
          </span>
          <span className="text-iron-500 font-size-xs">
            Each row can have several; one set is these columns ({(group.fields ?? []).map((field) => field.label).join(", ")}). {instances.length} of up to {max} {max === 1 ? "set" : "sets"} used.
          </span>
        </div>
        <button
          type="button"
          onClick={() => wizard.addGroupInstance(group.program_name)}
          disabled={instances.length >= max}
          className="border rounded-3 bg-white px-2 py-1 font-size-sm d-flex flex-row align-items-center gap-1 flex-shrink-0"
          style={{ opacity: instances.length >= max ? 0.5 : 1 }}
          title={instances.length >= max ? `At most ${max} sets` : `Add a set of ${group.label} columns`}
        >
          <Plus size={13} /> Add set
        </button>
      </div>

      {instances.map((instance, index) => (
        <div key={instance.id} className="d-flex flex-column gap-2">
          <div className="d-flex flex-row align-items-center justify-content-between">
            <span className="text-iron-600 font-size-xs fw-medium">Set {index + 1}</span>
            {instances.length > min && (
              <button
                type="button"
                className="border-0 bg-transparent text-red-600 font-size-xs d-flex flex-row align-items-center gap-1"
                onClick={() => wizard.removeGroupInstance(group.program_name, instance.id)}
              >
                <Trash2 size={12} /> Remove set
              </button>
            )}
          </div>
          {(group.fields ?? []).map((field) => (
            <FieldRow
              key={field.program_name}
              field={{ ...field, required: field.required && (required || Object.values(instance.mapping ?? {}).some((entry) => entry?.value)) }}
              entry={instance.mapping?.[field.program_name]}
              headers={headers}
              samples={samples}
              usage={usage}
              labelSuffix={instances.length > 1 ? ` #${index + 1}` : ""}
              usageLabel={`${field.label} #${index + 1}`}
              onChange={(header) => wizard.setGroupField(group.program_name, instance.id, field.program_name, header)}
            />
          ))}
        </div>
      ))}
    </section>
  );
}

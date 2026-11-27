import { ChevronRight, Lock } from "lucide-react";

/**
 * The defaults a timetable will be generated with, one row each. A row with
 * `onEdit` is a button that opens that constraint's editor (the same drawer
 * as in the constraints list); a row without it is shown as set elsewhere.
 *
 *   <ConstraintSummary rows={[{ label, value, onEdit?, hint? }]} />
 */
export default function ConstraintSummary({ rows = [] }) {
  return (
    <div className="border rounded-3 bg-white w-100 overflow-hidden">
      {rows.map(({ label, value, onEdit, hint }, index) => {
        const content = (
          <>
            <span className="text-iron-500 text-start">{label}</span>
            <span className="d-flex flex-row align-items-center gap-2 text-end" style={{ minWidth: 0 }}>
              <span className="fw-medium text-truncate">{value}</span>
              {onEdit ? (
                <ChevronRight size={15} className="constraint-summary__chevron flex-shrink-0" aria-hidden="true" />
              ) : (
                <Lock size={13} className="text-iron-300 flex-shrink-0" aria-hidden="true" />
              )}
            </span>
          </>
        );
        const className = `constraint-summary__row d-flex flex-row align-items-center justify-content-between gap-3 px-3 py-2 font-size-sm w-100 ${index ? "border-top" : ""}`;

        return onEdit ? (
          <button
            key={label}
            type="button"
            className={`${className} constraint-summary__row--editable`}
            onClick={onEdit}
            title={`Change ${label.toLowerCase()}`}
            aria-label={`${label}: ${value}. Change`}
          >
            {content}
          </button>
        ) : (
          <div key={label} className={className} title={hint}>
            {content}
          </div>
        );
      })}
    </div>
  );
}

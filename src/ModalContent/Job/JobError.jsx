import { CircleX, TriangleAlert } from "lucide-react";
import { Fragment } from "react";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { useGetJobErrors } from "../../hooks/job/useGetJobErrors";

/** Colours per reason, so the kind of problem reads at a glance. */
const REASON_STYLE = {
  already_exists: { background: "#eef4ff", color: "#2f5bd3" },
  duplicate_in_file: { background: "#f3eefe", color: "#6b3fd4" },
  missing_value: { background: "#fff4e0", color: "#a35d00" },
  invalid_value: { background: "#fff4e0", color: "#a35d00" },
  not_found: { background: "#fdeeee", color: "#b42318" },
  not_allowed: { background: "#fdeeee", color: "#b42318" },
  unexpected_error: { background: "#f2f2f2", color: "#444" },
};

const rowsLabel = (group) =>
  `${group.count === 1 ? "Row" : "Rows"} ${group.row_ranges}`;

/**
 * The problems of a finished job, one card per reason: "Rows 2–21 · Already
 * exists · A teacher with this email already exists at this school", with a
 * few of the values concerned.
 */
function JobError({ handleClose, rowData }) {
  const { jobId, title } = rowData;
  const { data, isLoading, isError } = useGetJobErrors(jobId);
  const report = data?.data;
  const groups = report?.groups ?? [];

  return (
    <div className="d-flex flex-column font-size-sm gap-2">
      <div
        className="border-bottom rounded-top-4 p-2 d-flex flex-row align-items-center justify-content-between"
        style={{ background: "#f9f9f9" }}
      >
        <div className="d-flex flex-column">
          <span className="fw-semibold">
            {report?.job?.title ?? title ?? "Job"} issues
          </span>
          {report?.summary && (
            <span className="text-muted">{report.summary}</span>
          )}
        </div>
        <button
          onClick={() => handleClose()}
          className="border-none border rounded-circle bg-transparent p-0"
          style={{ width: "2rem", height: "2rem", display: "grid", placeItems: "center", cursor: "pointer" }}
          aria-label="Close"
        >
          <CircleX size={16} />
        </button>
      </div>

      <div
        className="px-2 pb-3 d-flex flex-column gap-3 scroll-bar-sm over-flow-y-auto"
        style={{ maxHeight: "65dvh" }}
      >
        {isLoading ? (
          [...Array(3)].map((_, index) => (
            <RectangleSkeleton key={index} width="100%" height="4.5rem" />
          ))
        ) : isError ? (
          <span className="text-muted py-4 text-center">
            The issues could not be loaded. Please try again.
          </span>
        ) : (
          <>
            {report?.error_message && groups.length === 0 && (
              <div className="d-flex flex-row gap-2 align-items-start p-2 rounded-3" style={{ background: "#fdeeee" }}>
                <TriangleAlert size={16} color="#b42318" style={{ flexShrink: 0, marginTop: 2 }} />
                <span>{report.error_message}</span>
              </div>
            )}

            {groups.length > 0 && (
              <span className="text-muted">
                {report.failed_rows} {report.failed_rows === 1 ? "row" : "rows"} could not be imported,
                for {groups.length} {groups.length === 1 ? "reason" : "reasons"}. Fix them in the file and
                import only those rows again.
              </span>
            )}

            {groups.map((group, index) => {
              const style = REASON_STYLE[group.reason] ?? REASON_STYLE.unexpected_error;
              return (
                <Fragment key={`${group.reason}-${index}`}>
                  <div className="border rounded-3 p-2 d-flex flex-column gap-2">
                    <div className="d-flex flex-row align-items-center justify-content-between gap-2">
                      <span className="fw-semibold">{rowsLabel(group)}</span>
                      <span
                        className="rounded-pill px-2 py-1"
                        style={{ ...style, fontSize: "0.75rem", whiteSpace: "nowrap" }}
                      >
                        {group.title} · {group.count}
                      </span>
                    </div>
                    <span>{group.message}</span>
                    {group.examples?.length > 0 && (
                      <div className="d-flex flex-row flex-wrap gap-1">
                        {group.examples.map((example) => (
                          <span
                            key={`${example.row}-${example.value}`}
                            className="border rounded-2 px-2 text-muted"
                            style={{ fontSize: "0.75rem" }}
                            title={`Row ${example.row}`}
                          >
                            {example.value} <span className="opacity-75">· row {example.row}</span>
                          </span>
                        ))}
                        {group.count > group.examples.length && (
                          <span className="text-muted" style={{ fontSize: "0.75rem" }}>
                            +{group.count - group.examples.length} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </Fragment>
              );
            })}

            {!report?.error_message && groups.length === 0 && (
              <span className="text-muted py-4 text-center">
                This job has no issues.
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default JobError;

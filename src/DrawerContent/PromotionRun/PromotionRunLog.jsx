import { CircleAlert, Dot, GraduationCap, TriangleAlert } from "lucide-react";
import { useMemo, useState } from "react";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import StatusPill from "../../components/Election/StatusPill";
import EmptyState, { EmptyStateButton } from "../../components/errors/EmptyState";
import SearchInput from "../../components/input/search";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { useDebounce } from "../../hooks/common/useDebounce";
import { useGetPromotionRunLog } from "../../hooks/promotionRun/useGetPromotionRunLog";
import { isEmptyListError } from "../../utils/teacher/teacherFilters";

const LOG_STATUS = {
  completed: { label: "Completed", tone: "success" },
  failed: { label: "Failed", tone: "danger" },
  cancelled: { label: "Cancelled", tone: "warning" },
};

const OUTCOME = {
  retained: { label: "Retained", tone: "danger" },
  pending_review: { label: "Needs review", tone: "warning" },
  promoted: { label: "Promoted", tone: "success" },
};

const COUNTS = [
  { key: "total", label: "Students" },
  { key: "promoted", label: "Promoted" },
  { key: "retained", label: "Retained" },
  { key: "needs_review", label: "Need review" },
];

/** Search shows students only once the list is long enough to need it. */
const SEARCH_FROM = 6;

const formatFinished = (value) => {
  const date = value ? new Date(value) : null;
  return date && !Number.isNaN(date.getTime())
    ? date.toLocaleString(undefined, { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })
    : null;
};

function RunHeader({ run }) {
  return (
    <div className="d-flex flex-row align-items-center gap-2 font-size-sm">
      <div
        className="bg-primary-50 text-primary-500 rounded-2 flex-shrink-0"
        style={{ width: "2.5rem", height: "2.5rem", display: "grid", placeItems: "center" }}
      >
        <GraduationCap size={18} />
      </div>
      <div className="d-flex flex-column" style={{ minWidth: 0 }}>
        <span className="fw-semibold text-truncate">{run?.specialty ?? "Promotion run"}</span>
        <div className="d-flex flex-row align-items-center text-iron-400 fw-light" style={{ minWidth: 0 }}>
          <span className="text-nowrap">{run?.level_name ?? "-"}</span>
          <Dot size={16} className="flex-shrink-0" />
          <span className="text-nowrap">{run?.academic_year ?? "-"}</span>
          {run?.department && (
            <>
              <Dot size={16} className="flex-shrink-0" />
              <span className="text-truncate">{run.department}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Issue({ issue }) {
  const isError = issue.severity === "error";
  const IssueIcon = isError ? CircleAlert : TriangleAlert;
  const affected = issue.details?.affected_students;
  return (
    <div className="d-flex flex-row align-items-start gap-2 py-2">
      <IssueIcon size={15} className={`flex-shrink-0 ${isError ? "text-red-500" : "text-old-lace-600"}`} style={{ marginTop: "0.15rem" }} />
      <div className="d-flex flex-column" style={{ minWidth: 0 }}>
        <span className="fw-semibold">{issue.title}</span>
        <span className="text-iron-600" style={{ lineHeight: 1.5 }}>{issue.message}</span>
        {affected && <span className="font-size-xs text-iron-400">Affects all {affected} students</span>}
      </div>
    </div>
  );
}

function StudentRow({ student }) {
  const outcome = OUTCOME[student.outcome] ?? { label: student.outcome, tone: "neutral" };
  return (
    <div className="d-flex flex-column gap-1 py-2">
      <div className="d-flex flex-row align-items-center justify-content-between gap-2">
        <span className="fw-semibold text-truncate" title={student.name}>{student.name ?? "Student"}</span>
        <StatusPill tone={outcome.tone}>{outcome.label}</StatusPill>
      </div>
      {student.problems.length > 0 ? (
        <ul className="m-0 ps-3 text-iron-600" style={{ lineHeight: 1.5 }}>
          {student.problems.map((problem) => (
            <li key={`${problem.rule}-${problem.message}`}>{problem.message}</li>
          ))}
        </ul>
      ) : (
        <span className="font-size-xs text-iron-400">Only the run-wide warnings above apply.</span>
      )}
    </div>
  );
}

/** A titled list separated by thin lines. */
function Section({ title, count, children }) {
  return (
    <div className="d-flex flex-column">
      <span className="font-size-xs fw-semibold text-iron-500 text-uppercase" style={{ letterSpacing: "0.04em" }}>
        {title}{count != null ? ` · ${count}` : ""}
      </span>
      <div className="d-flex flex-column">{children}</div>
    </div>
  );
}

function LogBody({ log }) {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 250);
  const errors = log.issues.filter((issue) => issue.severity === "error");
  const warnings = log.issues.filter((issue) => issue.severity !== "error");
  const students = log.students ?? [];

  const visibleStudents = useMemo(() => {
    const words = debouncedSearch.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (words.length === 0) return students;
    return students.filter((student) => {
      const haystack = [student.name, OUTCOME[student.outcome]?.label, ...student.problems.map((p) => p.message)].join(" ").toLowerCase();
      return words.every((word) => haystack.includes(word));
    });
  }, [students, debouncedSearch]);

  const hasCounts = log.status !== "failed" && Object.keys(log.counts ?? {}).length > 0;
  const nothingToReport = errors.length === 0 && warnings.length === 0 && students.length === 0;

  return (
    <div className="d-flex flex-column gap-4 font-size-sm">
      <div className="d-flex flex-column gap-2">
        <span className="text-iron-700" style={{ lineHeight: 1.5 }}>{log.summary}</span>
        {hasCounts && (
          <div className="d-flex flex-row flex-wrap gap-4">
            {COUNTS.map((count) => (
              <div key={count.key} className="d-flex flex-column">
                <span className="fw-semibold" style={{ fontSize: "1.1rem" }}>{log.counts[count.key] ?? 0}</span>
                <span className="font-size-xs text-iron-500">{count.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {nothingToReport && (
        <EmptyState
          mascot="empty"
          height="12rem"
          mascotHeight="6rem"
          title="Nothing to report"
          description="Every student was evaluated without any problems."
        />
      )}

      {errors.length > 0 && (
        <Section title={errors.length === 1 ? "Problem" : "Problems"} count={errors.length}>
          {errors.map((issue) => <div key={issue.title} className="border-top"><Issue issue={issue} /></div>)}
        </Section>
      )}

      {warnings.length > 0 && (
        <Section title="Warnings" count={warnings.length}>
          {warnings.map((issue) => <div key={`${issue.title}-${issue.message}`} className="border-top"><Issue issue={issue} /></div>)}
        </Section>
      )}

      {students.length > 0 && (
        <Section title="Students not promoted" count={debouncedSearch ? `${visibleStudents.length} of ${students.length}` : students.length}>
          {students.length >= SEARCH_FROM && (
            <div className="py-2">
              <SearchInput
                placeholder="Search by name or reason"
                value={search}
                onChange={(value) => setSearch(value ?? "")}
                enableShortcut={false}
              />
            </div>
          )}
          {visibleStudents.length === 0 ? (
            <EmptyState
              mascot="notFound"
              height="10rem"
              mascotHeight="5rem"
              title="No matching students"
              description="No student's name or reason matches your search."
              actions={<EmptyStateButton variant="secondary" onClick={() => setSearch("")}>Clear search</EmptyStateButton>}
            />
          ) : (
            visibleStudents.map((student) => (
              <div key={student.student_id} className="border-top"><StudentRow student={student} /></div>
            ))
          )}
        </Section>
      )}
    </div>
  );
}

/**
 * What happened during a promotion run: its outcome, every problem that
 * stopped it, run-wide warnings, and why each student who was not promoted
 * was not. Built from GET promotion-run/{id}/log.
 */
function PromotionRunLog({ drawerData, handleClose }) {
  const { data, isLoading, error } = useGetPromotionRunLog(drawerData?.id);
  const log = data?.data;
  const status = LOG_STATUS[log?.status];
  const finished = formatFinished(log?.finished_at);

  return (
    <>
      <div className="d-flex flex-column gap-2 pt-2 px-2 pb-2 flex-shrink-0">
        <RunHeader run={drawerData} />
        {log && (
          <div className="d-flex flex-row align-items-center gap-2 font-size-xs text-iron-500">
            {status && <StatusPill tone={status.tone}>{status.label}</StatusPill>}
            {finished && <span>Finished {finished}</span>}
            {["scheduled", "evaluating", "processing"].includes(log.run_status) && (
              <StatusPill tone="primary" pulse>Running again</StatusPill>
            )}
          </div>
        )}
      </div>

      <div className="drawer-content px-2 pb-3">
        <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
        <div className="pt-3">
          {isLoading ? (
            <div className="d-flex flex-column gap-2">
              <RectangleSkeleton height="2.5rem" />
              <RectangleSkeleton height="4.5rem" />
              <RectangleSkeleton height="4.5rem" />
            </div>
          ) : error ? (
            isEmptyListError(error) ? (
              <EmptyState
                mascot="empty"
                height="16rem"
                mascotHeight="6rem"
                title={error?.response?.data?.errors?.title ?? "No log yet"}
                description={error?.response?.data?.errors?.description ?? "This run has not run yet."}
              />
            ) : (
              <EmptyState
                mascot="error"
                height="16rem"
                mascotHeight="6rem"
                title={error?.response?.data?.errors?.title ?? "The log could not be loaded"}
                description={error?.response?.data?.errors?.description ?? "Check your connection and try again."}
              />
            )
          ) : (
            log && <LogBody log={log} />
          )}
        </div>
      </div>

      <div className="drawer-footer font-size-sm">
        <div className="d-flex flex-column w-100">
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
          <div className="d-flex flex-row align-items-center p-2">
            <button type="button" className="border-none bg-none" onClick={() => handleClose?.()}>
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default PromotionRunLog;

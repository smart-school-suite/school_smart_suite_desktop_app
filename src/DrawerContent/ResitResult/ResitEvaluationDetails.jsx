import { useMemo, useState } from "react";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import StatusPill from "../../components/Election/StatusPill";
import EmptyState, { EmptyStateButton } from "../../components/errors/EmptyState";
import { NotFoundError } from "../../components/errors/Error";
import SearchInput from "../../components/input/search";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { useDebounce } from "../../hooks/common/useDebounce";
import { useGetResitResultProgress } from "../../hooks/resitResult/useGetResitResultProgress";

const TABS = [
  { key: "not_evaluated_students", label: "Not evaluated" },
  { key: "evaluated_students", label: "Evaluated" },
];

/** Search shows once a list is long enough to need it. */
const SEARCH_FROM = 6;

/** How far a resit exam's evaluation has got, and which candidates are still waiting. */
function ResitEvaluationDetails({ drawerData, handleClose }) {
  const { data, isLoading, error } = useGetResitResultProgress(drawerData?.id);
  const progress = data?.data;
  const summary = progress?.summary ?? {};
  const [tab, setTab] = useState(summary.total_not_evaluated === 0 ? "evaluated_students" : "not_evaluated_students");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 250);

  const students = progress?.[tab] ?? [];
  const visible = useMemo(() => {
    const words = debouncedSearch.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (!words.length) return students;
    return students.filter((student) => words.every((word) => `${student.name ?? ""} ${student.username ?? ""}`.toLowerCase().includes(word)));
  }, [students, debouncedSearch]);

  const percent = Math.round(summary.evaluated_percentage ?? 0);

  return (
    <>
      <div className="font-size-sm d-flex flex-column gap-3 pt-2 px-2 pb-2 flex-shrink-0">
        {isLoading ? (
          <RectangleSkeleton height="4rem" />
        ) : (
          !error && (
            <>
              <div className="d-flex flex-column gap-1">
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <span className="text-iron-700">
                    {summary.total_evaluated ?? 0} of {summary.total_candidates ?? 0} candidates evaluated
                  </span>
                  <StatusPill tone={percent === 100 ? "success" : "warning"}>{percent}%</StatusPill>
                </div>
                <div className="rounded-pill bg-iron-100" style={{ height: "0.4rem" }}>
                  <div className="rounded-pill primary-background" style={{ height: "100%", width: `${percent}%` }} />
                </div>
              </div>
              <div className="d-flex flex-row gap-2">
                {TABS.map((item) => {
                  const count = item.key === "evaluated_students" ? summary.total_evaluated : summary.total_not_evaluated;
                  const selected = tab === item.key;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => { setTab(item.key); setSearch(""); }}
                      className={`rounded-pill px-3 py-1 font-size-xs ${selected ? "border border-primary-500 bg-primary-50 text-primary-600" : "border bg-white text-iron-600"}`}
                    >
                      {item.label} · {count ?? 0}
                    </button>
                  );
                })}
              </div>
            </>
          )
        )}
      </div>

      <div className="drawer-content px-2 pb-3 font-size-sm">
        <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
        {isLoading ? (
          <div className="d-flex flex-column gap-2 pt-3">
            {[...Array(5)].map((_, index) => <RectangleSkeleton key={index} height="2.5rem" />)}
          </div>
        ) : error ? (
          <NotFoundError
            title={error?.response?.data?.errors?.title}
            description={error?.response?.data?.errors?.description}
          />
        ) : (
          <div className="d-flex flex-column pt-2">
            {students.length >= SEARCH_FROM && (
              <div className="py-2">
                <SearchInput placeholder="Search by name or username" value={search} onChange={(value) => setSearch(value ?? "")} enableShortcut={false} />
              </div>
            )}
            {students.length === 0 ? (
              <EmptyState
                mascot="empty"
                height="14rem"
                mascotHeight="6rem"
                title={tab === "not_evaluated_students" ? "Everyone is evaluated" : "No one evaluated yet"}
                description={tab === "not_evaluated_students" ? "Every candidate has a recorded resit score." : "No resit scores have been recorded for this exam yet."}
              />
            ) : visible.length === 0 ? (
              <EmptyState
                mascot="notFound"
                height="12rem"
                mascotHeight="5rem"
                title="No matching candidates"
                description="No candidate's name or username matches your search."
                actions={<EmptyStateButton variant="secondary" onClick={() => setSearch("")}>Clear search</EmptyStateButton>}
              />
            ) : (
              visible.map((student) => (
                <div key={student.candidate_id} className="d-flex flex-row align-items-center justify-content-between gap-2 py-2 border-top">
                  <div className="d-flex flex-column" style={{ minWidth: 0 }}>
                    <span className="fw-semibold text-truncate">{student.name ?? "Student"}</span>
                    {student.username && <span className="font-size-xs text-iron-400">@{student.username}</span>}
                  </div>
                  {tab === "evaluated_students" && (
                    <span className="font-size-xs text-iron-500 flex-shrink-0">
                      {student.scores_recorded} {student.scores_recorded === 1 ? "score" : "scores"}
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        )}
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
export default ResitEvaluationDetails;

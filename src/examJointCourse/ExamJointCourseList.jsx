import { Icon } from "@iconify/react";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetExams } from "../hooks/exam/useGetExams";
import { useGetExamJointCourseTerm, useSyncExamJointCourses } from "../hooks/examJointCourseTimetable";
import { setSelectedExamJointCourse } from "../Slices/ExamJointCourse/examJointCourseTimetableSlice";
import { formatExamDate } from "../examTimetable/constraints/fields";
import "../styles/constraintWizard.css";

const matches = (course, query) =>
  !query ||
  query
    .split(/\s+/)
    .filter(Boolean)
    .every((term) =>
      [course.course?.title, course.course?.code, ...(course.specialties ?? []).map((specialty) => specialty.label)]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(term),
    );

/** Left panel: the joint exams of the selected academic year and exam type. */
function ExamJointCourseList() {
  const dispatch = useDispatch();
  const { term, selectedCourseId } = useSelector((state) => state.examJointCourseTimetable);
  const { data, isLoading, error } = useGetExamJointCourseTerm(term);
  const { data: exams } = useGetExams();
  const sync = useSyncExamJointCourses();
  const [query, setQuery] = useState("");

  const courses = data?.data?.courses ?? [];
  const summary = data?.data?.summary;
  const normalised = query.trim().toLowerCase();
  const filtered = useMemo(() => courses.filter((course) => matches(course, normalised)), [courses, normalised]);
  const examIds = (exams?.data ?? []).filter((exam) => exam.exam_type !== "resit").map((exam) => exam.id);

  return (
    <aside className="ctl" aria-label="Joint exams">
      <div className="ctl-top d-flex flex-column gap-2">
        <span className="fw-semibold">Joint exams</span>
        <button
          type="button"
          className="ctl-new"
          disabled={sync.isPending || examIds.length === 0}
          onClick={() => sync.mutate(examIds)}
          title="Links every exam to the courses it shares with other specialties. New exams are linked when they are created."
        >
          <Icon icon={sync.isPending ? "lucide:loader-circle" : "lucide:refresh-cw"} width={16} height={16} className={sync.isPending ? "ctl-spin" : undefined} />
          <span>{sync.isPending ? "Finding joint exams…" : "Find joint exams"}</span>
        </button>
      </div>

      <section className="ctl-group ctl-group--constraints">
        <div className="ctl-group__head" role="presentation">
          <span className="ctl-group__title">Courses</span>
          {courses.length > 0 && <span className="ctl-group__count">{courses.length}</span>}
        </div>

        {courses.length > 0 && (
          <div className="ctl-search">
            <Icon icon="lucide:search" width={14} height={14} className="ctl-search__icon" />
            <input
              type="search"
              className="ctl-search__input"
              placeholder="Find a course or specialty"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => event.key === "Escape" && setQuery("")}
              aria-label="Find a joint exam"
            />
            {query && (
              <button type="button" className="ctl-search__clear" onClick={() => setQuery("")} aria-label="Clear search">
                <Icon icon="lucide:x" width={14} height={14} />
              </button>
            )}
          </div>
        )}

        <div className="ctl-scroll">
          {!term ? (
            <p className="ctl-empty">Choose an academic year and exam above.</p>
          ) : isLoading ? (
            [...Array(5)].map((_, index) => <div key={index} className="ctl-skeleton" />)
          ) : error ? (
            <p className="ctl-empty ctl-empty--error">{error?.response?.data?.errors?.description ?? "Could not load joint exams."}</p>
          ) : courses.length === 0 ? (
            <p className="ctl-empty">{summary?.message}</p>
          ) : filtered.length === 0 ? (
            <p className="ctl-empty">No courses match “{query.trim()}”.</p>
          ) : (
            <ul className="ctl-list">
              {filtered.map((course) => {
                const isSelected = selectedCourseId === course.id;
                const configured = course.status === "configured";
                return (
                  <li key={course.id}>
                    <button
                      type="button"
                      className={`ctl-item ${isSelected ? "is-active" : ""}`}
                      aria-current={isSelected ? "true" : undefined}
                      onClick={() => dispatch(setSelectedExamJointCourse(course.id))}
                      title={(course.specialties ?? []).map((specialty) => specialty.label).join(", ")}
                    >
                      <span className="d-flex flex-column flex-grow-1 text-start" style={{ minWidth: 0 }}>
                        <span className="ctl-item__label">{course.course?.title}</span>
                        <span className="font-size-xs text-iron-500 text-truncate">
                          {[course.course?.code, `${course.specialties?.length ?? 0} specialties`].filter(Boolean).join(" · ")}
                        </span>
                      </span>
                      <span className="ctl-item__meta">
                        <span className={`ctl-tag ${configured ? "ctl-tag--latest" : "ctl-tag--hard"}`}>
                          {configured ? formatExamDate(course.slot?.date, "d MMM") : "No time"}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
    </aside>
  );
}

export default ExamJointCourseList;

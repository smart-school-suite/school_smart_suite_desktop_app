import { Icon } from "@iconify/react";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetJointCourseTerm } from "../../hooks/jointCourseTimetable/useGetJointCourseTerm";
import { setSelectedJointCourse } from "../../Slices/jointCourse/jointCourseTimetableSlice";
import "../../styles/constraintWizard.css";

const matches = (course, query) => {
  if (!query) return true;
  const haystack = [
    course.course.title,
    course.course.code,
    ...course.specialties.map((specialty) => specialty.label),
    ...course.teachers.map((teacher) => teacher.name),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return query
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
};

function JointCourseList() {
  const dispatch = useDispatch();
  const { term, selectedCourseId } = useSelector(
    (state) => state.jointCourseTimetable,
  );
  const { data, isLoading, error } = useGetJointCourseTerm(term);
  const [query, setQuery] = useState("");

  const courses = data?.data?.courses ?? [];
  const summary = data?.data?.summary;
  const normalisedQuery = query.trim().toLowerCase();
  const filtered = useMemo(
    () => courses.filter((course) => matches(course, normalisedQuery)),
    [courses, normalisedQuery],
  );

  return (
    <aside className="ctl" aria-label="Joint courses">
      <div className="ctl-top d-flex flex-column gap-1">
        <span className="fw-semibold">Joint courses</span>
        <span className="font-size-xs text-iron-500">
          {!term
            ? "Select an academic year and semester to see its joint courses."
            : summary
              ? `${summary.configured_count} of ${summary.course_count} have their times set`
              : "Loading…"}
        </span>
      </div>

      <section className="ctl-group ctl-group--constraints">
        <div className="ctl-group__head" role="presentation">
          <span className="ctl-group__title">Courses</span>
          {courses.length > 0 && (
            <span className="ctl-group__count">{courses.length}</span>
          )}
        </div>

        {courses.length > 0 && (
          <div className="ctl-search">
            <Icon
              icon="lucide:search"
              width={14}
              height={14}
              className="ctl-search__icon"
            />
            <input
              type="search"
              className="ctl-search__input"
              placeholder="Find a course, specialty or teacher"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => event.key === "Escape" && setQuery("")}
              aria-label="Find a joint course"
            />
            {query && (
              <button
                type="button"
                className="ctl-search__clear"
                onClick={() => setQuery("")}
                aria-label="Clear search"
              >
                <Icon icon="lucide:x" width={14} height={14} />
              </button>
            )}
          </div>
        )}

        <div className="ctl-scroll">
          {!term ? (
            <p className="ctl-empty">No term selected.</p>
          ) : isLoading ? (
            [...Array(5)].map((_, index) => (
              <div key={index} className="ctl-skeleton" />
            ))
          ) : error ? (
            <p className="ctl-empty ctl-empty--error">
              {error?.response?.data?.errors?.description ??
                "Could not load joint courses."}
            </p>
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
                      onClick={() => dispatch(setSelectedJointCourse(course.id))}
                      title={course.specialties.map((s) => s.label).join(", ")}
                    >
                      <span className="d-flex flex-column flex-grow-1 text-start" style={{ minWidth: 0 }}>
                        <span className="ctl-item__label">{course.course.title}</span>
                        <span className="font-size-xs text-iron-500 text-truncate">
                          {[course.course.code, `${course.specialties.length} specialties`]
                            .filter(Boolean)
                            .join(" · ")}
                        </span>
                      </span>
                      <span className="ctl-item__meta">
                        <span className={`ctl-tag ${configured ? "ctl-tag--latest" : "ctl-tag--hard"}`}>
                          {configured ? `${course.slot_count} set` : "No time"}
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

export default JointCourseList;

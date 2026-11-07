import { useHotkey } from "@tanstack/react-hotkeys";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetExams } from "../../hooks/exam/useGetExams";
import {
  setSelectedAcademicYear,
  setSelectedExam,
} from "../../Slices/exam/examInvigilatorSlice";
import "../../styles/constraintWizard.css";

const collapse = {
  initial: { height: 0, opacity: 0 },
  animate: { height: "auto", opacity: 1 },
  exit: { height: 0, opacity: 0 },
  transition: { duration: 0.18, ease: "easeInOut" },
};

const ALL = "all";

const statusKey = (status) => String(status ?? "").toLowerCase();

const statusTagClass = (status) => {
  const value = statusKey(status);
  if (value === "active") return "ctl-tag--active";
  if (value === "upcoming") return "ctl-tag--upcoming";
  return "ctl-tag--muted";
};

const humanize = (value) => String(value ?? "").replaceAll("_", " ");

// "ca" is an acronym (continuous assessment), so keep it upper case.
const examTypeLabel = (type) =>
  statusKey(type) === "ca"
    ? "CA"
    : humanize(type).replace(/^\w/, (letter) => letter.toUpperCase());

const examMeta = (exam) =>
  [
    exam?.level_name,
    examTypeLabel(exam?.exam_type),
    exam?.max_score != null && `${exam.max_score} pts`,
  ]
    .filter(Boolean)
    .join(" · ");

const matches = (exam, query) => {
  if (!query) return true;
  const haystack = [
    exam.specialty_name,
    exam.level_name,
    humanize(exam.exam_type),
    exam.semester_name,
    exam.school_year,
    exam.status,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return query
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
};

// Academic year → semester → exam, newest year first.
const groupExams = (exams) => {
  const years = new Map();
  for (const exam of exams) {
    const year = exam.school_year || "Unknown year";
    const semester = exam.semester_name || "No semester";
    if (!years.has(year)) years.set(year, new Map());
    const semesters = years.get(year);
    if (!semesters.has(semester)) semesters.set(semester, []);
    semesters.get(semester).push(exam);
  }
  return [...years.entries()]
    .sort(([a], [b]) => String(b).localeCompare(String(a)))
    .map(([year, semesters]) => ({
      year,
      count: [...semesters.values()].reduce(
        (sum, list) => sum + list.length,
        0,
      ),
      semesters: [...semesters.entries()].map(([semester, list]) => ({
        semester,
        exams: list,
      })),
    }));
};

// Exam picker for the invigilator page, styled like the semester timetable sidebar.
function ExamNavigator() {
  const dispatch = useDispatch();
  const { selectedExam, selectedAcademicYear } = useSelector(
    (state) => state.examInvigilator,
  );
  const { data, isLoading, error } = useGetExams();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState(ALL);
  const [openYears, setOpenYears] = useState(() =>
    selectedAcademicYear ? new Set([selectedAcademicYear]) : null,
  );
  const searchRef = useRef(null);

  useHotkey("Mod+E", () => searchRef.current?.focus(), {
    meta: { name: "Find exam", description: "Focus the exam search" },
  });

  const exams = data?.data ?? [];
  const normalisedQuery = query.trim().toLowerCase();

  const statusCounts = useMemo(() => {
    const counts = new Map();
    for (const exam of exams) {
      const key = statusKey(exam.status);
      if (key) counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    return counts;
  }, [exams]);

  const groups = useMemo(
    () =>
      groupExams(
        exams.filter(
          (exam) =>
            (status === ALL || statusKey(exam.status) === status) &&
            matches(exam, normalisedQuery),
        ),
      ),
    [exams, status, normalisedQuery],
  );

  // Until the user toggles a year, open the selected exam's year (or the newest).
  const defaultOpenYear = selectedExam?.school_year ?? groups[0]?.year;
  const isYearOpen = (year) =>
    Boolean(normalisedQuery) ||
    (openYears ? openYears.has(year) : year === defaultOpenYear);

  const toggleYear = (year) =>
    setOpenYears((current) => {
      const next = new Set(
        current ?? (defaultOpenYear ? [defaultOpenYear] : []),
      );
      if (next.has(year)) next.delete(year);
      else next.add(year);
      return next;
    });

  const selectExam = (exam) => {
    dispatch(setSelectedExam({ exam }));
    dispatch(setSelectedAcademicYear({ academicYear: exam.school_year }));
    setOpenYears((current) => new Set(current ?? []).add(exam.school_year));
  };

  const isFiltering = Boolean(normalisedQuery) || status !== ALL;

  return (
    <aside className="ctl" aria-label="Examinations">
      <div className="ctl-top d-flex flex-column gap-1">
        <span className="fw-semibold">Examinations</span>
        <span className="font-size-xs text-iron-500 text-truncate">
          {selectedExam
            ? `${selectedExam.specialty_name} · ${examMeta(selectedExam)}`
            : "Pick an exam to manage its invigilators"}
        </span>
      </div>

      <section className="ctl-group ctl-group--constraints">
        <div className="ctl-group__head" role="presentation">
          <span className="ctl-group__title">Exams</span>
          {exams.length > 0 && (
            <span className="ctl-group__count">{exams.length}</span>
          )}
        </div>

        {exams.length > 0 && (
          <>
            <div className="ctl-search">
              <Icon
                icon="lucide:search"
                width={14}
                height={14}
                className="ctl-search__icon"
              />
              <input
                ref={searchRef}
                type="search"
                className="ctl-search__input"
                placeholder="Find a specialty, level or year"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => event.key === "Escape" && setQuery("")}
                aria-label="Find an exam"
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

            {statusCounts.size > 1 && (
              <div
                className="ctl-filter"
                role="radiogroup"
                aria-label="Filter by status"
              >
                {[[ALL, exams.length], ...statusCounts.entries()].map(
                  ([key, count]) => (
                    <button
                      key={key}
                      type="button"
                      role="radio"
                      aria-checked={status === key}
                      className={`ctl-filter__chip ${status === key ? "is-active" : ""}`}
                      onClick={() => setStatus(key)}
                    >
                      <span className="text-capitalize">{humanize(key)}</span>
                      <span className="ctl-filter__count">{count}</span>
                    </button>
                  ),
                )}
              </div>
            )}
          </>
        )}

        <div className="ctl-scroll">
          {isLoading ? (
            [...Array(6)].map((_, index) => (
              <div key={index} className="ctl-skeleton" />
            ))
          ) : error ? (
            <p className="ctl-empty ctl-empty--error">
              {error?.response?.data?.errors?.description ??
                "Could not load exams."}
            </p>
          ) : exams.length === 0 ? (
            <p className="ctl-empty">No exams have been created yet.</p>
          ) : groups.length === 0 ? (
            <div className="ctl-empty d-flex flex-column align-items-center gap-1">
              <span>
                {normalisedQuery
                  ? `No exams match “${query.trim()}”.`
                  : "No exams with this status."}
              </span>
              {isFiltering && (
                <button
                  type="button"
                  className="ctl-item ctl-item--more justify-content-center w-auto"
                  onClick={() => {
                    setQuery("");
                    setStatus(ALL);
                  }}
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            groups.map((group) => {
              const isOpen = isYearOpen(group.year);
              return (
                <div className="ctl-cat" key={group.year}>
                  <button
                    type="button"
                    className="ctl-cat__head ctl-cat__head--sticky"
                    onClick={() => toggleYear(group.year)}
                    aria-expanded={isOpen}
                  >
                    <span className="ctl-cat__icon">
                      <Icon
                        icon="lucide:calendar-range"
                        width={14}
                        height={14}
                      />
                    </span>
                    <span className="ctl-cat__name">{group.year}</span>
                    <span className="ctl-cat__count">{group.count}</span>
                    <Icon
                      icon="lucide:chevron-down"
                      width={14}
                      height={14}
                      className={`ctl-group__chev ${isOpen ? "is-open" : ""}`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div className="ctl-cat__body" {...collapse}>
                        {group.semesters.map(({ semester, exams: list }) => (
                          <div key={semester} className="ctl-subgroup">
                            <span className="ctl-subgroup__label">
                              {humanize(semester)}
                            </span>
                            <ul className="ctl-cat__list">
                              {list.map((exam) => {
                                const isSelected = selectedExam?.id === exam.id;
                                return (
                                  <li key={exam.id}>
                                    <button
                                      type="button"
                                      className={`ctl-item ${isSelected ? "is-active" : ""}`}
                                      aria-current={
                                        isSelected ? "true" : undefined
                                      }
                                      onClick={() => selectExam(exam)}
                                      title={`${exam.specialty_name} · ${examMeta(exam)}`}
                                    >
                                      <span
                                        className="d-flex flex-column flex-grow-1 text-start"
                                        style={{ minWidth: 0 }}
                                      >
                                        <span className="ctl-item__label">
                                          {exam.specialty_name}
                                        </span>
                                        <span className="ctl-item__sub text-capitalize">
                                          {examMeta(exam)}
                                        </span>
                                      </span>
                                      {exam.status && (
                                        <span className="ctl-item__meta">
                                          <span
                                            className={`ctl-tag ${statusTagClass(exam.status)}`}
                                          >
                                            {humanize(exam.status)}
                                          </span>
                                        </span>
                                      )}
                                    </button>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>
      </section>
    </aside>
  );
}

export default ExamNavigator;

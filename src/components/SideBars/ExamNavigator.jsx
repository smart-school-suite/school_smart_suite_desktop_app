import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useGetExams } from "../../hooks/exam/useGetExams";
import "../../styles/constraintWizard.css";
import "../../styles/invigilator.css";
import {
  EXAM_STATUSES,
  examMatches,
  groupExamsByYearAndSemester,
} from "../../utils/invigilator/invigilatorFilters";

const collapse = {
  initial: { height: 0, opacity: 0 },
  animate: { height: "auto", opacity: 1 },
  exit: { height: 0, opacity: 0 },
  transition: { duration: 0.18, ease: "easeInOut" },
};

const STATUS_LABEL = {
  all: "All",
  active: "Active",
  upcoming: "Upcoming",
  finished: "Finished",
};

export function ExamStatusTag({ status }) {
  if (!status) return null;
  const known = EXAM_STATUSES.includes(status) ? status : "finished";
  return <span className={`ctl-tag exam-nav__tag exam-nav__tag--${known}`}>{status}</span>;
}

/**
 * Academic year → semester → exam picker, styled like the teacher course
 * SpecialtyNavigator. Calls `onSelect(exam)` with the whole exam object.
 */
function ExamNavigator({ selectedExam, onSelect, title, description }) {
  const { data: exams, isLoading, error } = useGetExams();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  // null until the user opens or closes a year; until then the year holding
  // the selected exam (or the newest year) starts open
  const [openYears, setOpenYears] = useState(null);

  const all = useMemo(() => (Array.isArray(exams?.data) ? exams.data : []), [exams]);
  const statusCounts = useMemo(() => {
    const counts = { all: all.length };
    for (const value of EXAM_STATUSES) counts[value] = 0;
    for (const exam of all) {
      if (exam?.status in counts) counts[exam.status] += 1;
    }
    return counts;
  }, [all]);

  const searching = query.trim().length > 0;
  const years = useMemo(
    () =>
      groupExamsByYearAndSemester(
        all.filter(
          (exam) =>
            (status === "all" || exam?.status === status) && examMatches(exam, query),
        ),
      ),
    [all, status, query],
  );

  const defaultOpen = useMemo(() => {
    if (selectedExam?.school_year) return new Set([selectedExam.school_year]);
    const newest = groupExamsByYearAndSemester(all)[0];
    return new Set(newest ? [newest.school_year] : []);
  }, [all, selectedExam?.school_year]);
  const open = openYears ?? defaultOpen;

  const toggleYear = (year) =>
    setOpenYears(() => {
      const next = new Set(open);
      if (next.has(year)) next.delete(year);
      else next.add(year);
      return next;
    });

  const clearFilters = () => {
    setQuery("");
    setStatus("all");
  };

  return (
    <aside className="ctl" aria-label="Examinations">
      <div className="ctl-top d-flex flex-column gap-1">
        <span className="fw-semibold">{title}</span>
        <span className="font-size-xs text-iron-500 text-truncate">
          {selectedExam
            ? [selectedExam.specialty_name, selectedExam.level_name, selectedExam.exam_name]
                .filter(Boolean)
                .join(" · ")
            : description}
        </span>
      </div>

      <section className="ctl-group ctl-group--constraints">
        <div className="ctl-group__head" role="presentation">
          <span className="ctl-group__title">Examinations</span>
          {all.length > 0 && <span className="ctl-group__count">{all.length}</span>}
        </div>

        {all.length > 0 && (
          <>
            <div className="ctl-search">
              <Icon icon="lucide:search" width={14} height={14} className="ctl-search__icon" />
              <input
                type="search"
                className="ctl-search__input"
                placeholder="Find a specialty, level or exam"
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

            <div className="exam-nav__filters" role="radiogroup" aria-label="Filter by status">
              {["all", ...EXAM_STATUSES].map((value) => (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={status === value}
                  className={`exam-nav__filter ${status === value ? "is-active" : ""}`}
                  onClick={() => setStatus(value)}
                  disabled={value !== "all" && statusCounts[value] === 0}
                >
                  <span>{STATUS_LABEL[value]}</span>
                  <span className="exam-nav__filter-count">{statusCounts[value]}</span>
                </button>
              ))}
            </div>
          </>
        )}

        <div className="ctl-scroll">
          {isLoading ? (
            [...Array(6)].map((_, index) => <div key={index} className="ctl-skeleton" />)
          ) : error ? (
            <p className="ctl-empty ctl-empty--error">
              {error?.response?.data?.errors?.description ?? "Could not load exams."}
            </p>
          ) : all.length === 0 ? (
            <p className="ctl-empty">No exams have been created yet.</p>
          ) : years.length === 0 ? (
            <div className="ctl-empty d-flex flex-column align-items-center gap-1">
              <span>
                {searching
                  ? `No exams match “${query.trim()}”.`
                  : `No ${STATUS_LABEL[status].toLowerCase()} exams.`}
              </span>
              <button type="button" className="exam-nav__reset" onClick={clearFilters}>
                Clear filters
              </button>
            </div>
          ) : (
            years.map((year) => {
              const isOpen = searching || open.has(year.school_year);
              return (
                <div className="ctl-cat" key={year.school_year}>
                  <button
                    type="button"
                    className="ctl-cat__head ctl-cat__head--sticky"
                    onClick={() => toggleYear(year.school_year)}
                    aria-expanded={isOpen}
                  >
                    <span className="ctl-cat__icon">
                      <Icon icon="lucide:calendar-range" width={14} height={14} />
                    </span>
                    <span className="ctl-cat__name">{year.school_year}</span>
                    <span className="ctl-cat__count">{year.total}</span>
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
                        {year.semesters.map((semester) => (
                          <div key={semester.semester} className="exam-nav__semester">
                            <span className="exam-nav__semester-name">{semester.semester}</span>
                            <ul className="ctl-cat__list">
                              {semester.exams.map((exam) => {
                                const isSelected = exam?.id === selectedExam?.id;
                                return (
                                  <li key={exam?.id}>
                                    <button
                                      type="button"
                                      className={`ctl-item exam-nav__item ${isSelected ? "is-active" : ""}`}
                                      aria-current={isSelected ? "true" : undefined}
                                      onClick={() => {
                                        onSelect(exam);
                                        setOpenYears(() =>
                                          new Set(open).add(year.school_year),
                                        );
                                      }}
                                      title={`${exam?.specialty_name ?? ""} · ${exam?.exam_name ?? ""}`}
                                    >
                                      <span className="exam-nav__item-text">
                                        <span className="ctl-item__label">
                                          {exam?.specialty_name ?? "Unknown specialty"}
                                        </span>
                                        <span className="exam-nav__item-meta">
                                          {[exam?.level_name, exam?.exam_name ?? exam?.exam_type]
                                            .filter(Boolean)
                                            .join(" · ")}
                                        </span>
                                      </span>
                                      <span className="ctl-item__meta">
                                        <ExamStatusTag status={exam?.status} />
                                      </span>
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

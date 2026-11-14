import { autoUpdate, flip, FloatingPortal, offset, shift, useDismiss, useFloating, useInteractions, useRole } from "@floating-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, ClipboardList } from "lucide-react";
import { Fragment, useMemo, useState } from "react";
import { useGetExams } from "../hooks/exam/useGetExams";
import { useGetAllResitExams } from "../hooks/resitExam/useGetResitExams";

const STATUS_TONE = {
  upcoming: "bg-primary-50 text-primary-700",
  active: "bg-fern-50 text-fern-700",
  finished: "bg-iron-100 text-iron-600",
};

/**
 * Picker of what a timetable is for (an exam or a resit exam), in the
 * semester dropdown's style. `items` are { id, title, meta, status, search }.
 */
export function TimetableOwnerDropdown({ value, onChange, items, isLoading, error, labels }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { x, y, strategy, refs, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "bottom-start",
    middleware: [offset(8), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useDismiss(context, { outsidePress: true, escapeKey: true }),
    useRole(context, { role: "listbox" }),
  ]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) => item.search.toLowerCase().includes(q));
  }, [items, query]);

  // The selected value is stored as the API returned it; show it like its list item.
  const selected = useMemo(() => (value ? items.find((item) => item.id === value.id) ?? labels.describe(value) : null), [value, items, labels]);
  const title = (item) => item?.title;
  const meta = (item) => item?.meta;

  return (
    <div className="d-flex flex-column gap-2" style={{ width: "50%" }}>
      <motion.button
        ref={refs.setReference}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        className="outline-none w-100 px-2 py-1 bg-white font-size-sm d-flex flex-row align-items-center gap-2 rounded-3 text-start"
        style={{
          border: `1px solid ${open ? "var(--primary-color-400)" : "var(--iron-200)"}`,
          boxShadow: open ? "0 0 0 3px var(--primary-color-100)" : "0 1px 2px rgba(16, 24, 40, 0.04)",
        }}
        whileTap={{ scale: 0.995 }}
        {...getReferenceProps({ onClick: () => setOpen((current) => !current) })}
      >
        <span
          className={`d-inline-flex align-items-center justify-content-center rounded-2 flex-shrink-0 ${open || value ? "bg-primary-50 color-primary" : "bg-iron-100 text-iron-500"}`}
          style={{ width: "2rem", height: "2rem" }}
        >
          <ClipboardList size={16} />
        </span>
        <span className="d-flex flex-column flex-grow-1" style={{ minWidth: 0 }}>
          {isLoading && !value ? (
            <span className="text-iron-500">{labels.loading}</span>
          ) : selected ? (
            <>
              <span className="fw-medium text-capitalize text-truncate">{title(selected)}</span>
              <span className="font-size-xs text-iron-500 text-capitalize text-truncate">{meta(selected)}</span>
            </>
          ) : (
            <>
              <span className="fw-medium text-iron-700">{labels.placeholder}</span>
              <span className="font-size-xs text-iron-500">{labels.hint}</span>
            </>
          )}
        </span>
        <motion.span className={`d-inline-flex flex-shrink-0 ${open ? "color-primary" : "text-iron-500"}`} animate={{ rotate: open ? 180 : 0 }}>
          <ChevronDown size={16} />
        </motion.span>
      </motion.button>

      <FloatingPortal>
        <AnimatePresence>
          {open && (
            <motion.div
              ref={refs.setFloating}
              style={{ position: strategy, top: y ?? 0, left: x ?? 0, zIndex: 9999, width: refs.reference.current?.offsetWidth ?? "auto" }}
              className="bg-white p-2 rounded-4 border shadow-sm d-flex flex-column gap-2"
              {...getFloatingProps()}
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
            >
              <input type="search" className="rounded-3 form-control font-size-sm" placeholder={labels.search} value={query} onChange={(event) => setQuery(event.target.value)} autoFocus />
              <div className="d-flex flex-column gap-1" style={{ maxHeight: "280px", overflowY: "auto" }}>
                {isLoading ? (
                  <span className="font-size-sm">Loading...</span>
                ) : error ? (
                  <span className="font-size-sm text-danger">{labels.error}</span>
                ) : filtered.length === 0 ? (
                  <span className="font-size-sm">{labels.empty}</span>
                ) : (
                  filtered.map((exam, index) => {
                    const isSelected = value?.id === exam.id;
                    return (
                      <Fragment key={exam.id}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          className={`border-none font-size-sm w-100 rounded-3 px-2 py-1 ${isSelected ? "bg-primary-50" : "transparent-bg hover-bg-iron-50"}`}
                          onClick={() => {
                            onChange(exam.raw);
                            setQuery("");
                            setOpen(false);
                          }}
                        >
                          <div className="d-flex flex-row align-items-center justify-content-between w-100 gap-2">
                            <div className="d-flex flex-column gap-1 align-items-start text-start" style={{ minWidth: 0 }}>
                              <span className="fw-semibold text-capitalize text-truncate">{title(exam)}</span>
                              <span className="text-iron-500 text-truncate">{meta(exam)}</span>
                            </div>
                            <div className="d-flex flex-row align-items-center gap-2 flex-shrink-0">
                              {exam.status && <span className={`rounded-pill px-2 font-size-xs text-capitalize ${STATUS_TONE[exam.status] ?? STATUS_TONE.finished}`}>{exam.status}</span>}
                              {isSelected && <Check size={16} className="color-primary" />}
                            </div>
                          </div>
                        </button>
                        {index < filtered.length - 1 && <hr className="my-0 opacity-50" />}
                      </Fragment>
                    );
                  })
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </div>
  );
}

const EXAM_LABELS = {
  loading: "Loading exams…",
  placeholder: "Select an exam",
  hint: "Choose which exam's timetable to work on",
  search: "Search exam",
  error: "Error loading exams",
  empty: "No exams found",
  describe: (exam) => examItem(exam),
};

const examItem = (exam) => ({
  id: exam.id,
  raw: exam,
  title: [exam?.exam_name, exam?.school_year].filter(Boolean).join(" · "),
  meta: [exam?.specialty_name, exam?.level_name].filter(Boolean).join(" · "),
  status: exam?.status,
  search: [exam.exam_name, exam.specialty_name, exam.level_name, exam.school_year, exam.semester_name].filter(Boolean).join(" "),
});

/** Exam picker of the exam timetable. */
export function ExamDropdown({ value, onChange }) {
  const { data, isLoading, error } = useGetExams();
  // Resit exams have their own timetable.
  const items = useMemo(() => (data?.data ?? []).filter((exam) => exam.exam_type !== "resit").map(examItem), [data]);
  return <TimetableOwnerDropdown value={value} onChange={onChange} items={items} isLoading={isLoading} error={error} labels={EXAM_LABELS} />;
}

/** A resit exam as the API lists it (nested relations), flattened like an exam. */
export const normalizeResitExam = (resitExam) => {
  if (!resitExam) return null;
  const year = resitExam.school_year ?? resitExam.schoolYear;
  const specialty = year?.specialty;
  const examType = resitExam.exam_type ?? resitExam.examType;
  const systemYear = year?.system_academic_year ?? year?.systemAcademicYear;
  const today = new Date().toISOString().slice(0, 10);
  const start = resitExam.start_date?.slice(0, 10);
  const end = resitExam.end_date?.slice(0, 10);
  return {
    id: resitExam.id,
    exam_name: resitExam.exam_name ?? examType?.exam_name ?? "Resit exam",
    specialty_name: resitExam.specialty_name ?? specialty?.specialty_name,
    level_name: resitExam.level_name ?? specialty?.level?.name,
    school_year: resitExam.school_year_name ?? systemYear?.name,
    semester_name: resitExam.semester_name ?? examType?.semesters?.name ?? examType?.semester,
    exam_type: "resit",
    start_date: start,
    end_date: end,
    candidate_count: resitExam.resit_candidates?.length ?? resitExam.candidate_count,
    status: !start || !end ? null : end < today ? "finished" : start > today ? "upcoming" : "active",
  };
};

const RESIT_LABELS = {
  loading: "Loading resit exams…",
  placeholder: "Select a resit exam",
  hint: "Choose which resit exam's timetable to work on",
  search: "Search resit exam",
  error: "Error loading resit exams",
  empty: "No resit exams found",
  describe: (exam) => examItem(exam),
};

/** Resit exam picker of the resit timetable; selects the flattened resit exam. */
export function ResitExamDropdown({ value, onChange }) {
  const { data, isLoading, error } = useGetAllResitExams();
  const items = useMemo(() => (data?.data ?? []).map(normalizeResitExam).filter(Boolean).map(examItem), [data]);
  return <TimetableOwnerDropdown value={value} onChange={onChange} items={items} isLoading={isLoading} error={error} labels={RESIT_LABELS} />;
}

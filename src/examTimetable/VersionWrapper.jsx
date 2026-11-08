import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Drawer } from "../components/drawer/Drawer";
import ToastWarning from "../components/Toast/ToastWarning";
import { useCreateExamTimetableVersion } from "../hooks/examTimetableGeneration/mutations";
import { useGetExamTimetableConstraints, useGetExamTimetableVersions } from "../hooks/examTimetableGeneration/queries";
import { setExamTimetableVersion } from "../Slices/ExamTimetable/examTimetableSlice";
import { constraintCount } from "../utils/examTimetable/buildRequest";
import { SCHEDULER_STATUS } from "../utils/semesterTimetable/schedulerStatus";
import { examTimetableConstraintMap } from "./constraints/constraintMap";
import "../styles/constraintWizard.css";

const CATEGORY_ICONS = {
  schedule_constraint: "lucide:calendar-clock",
  course_constraint: "lucide:book-open",
  hall_constraint: "lucide:door-open",
  invigilator_constraint: "lucide:user-round-check",
  assignment_constraint: "lucide:link-2",
};

const collapse = {
  initial: { height: 0, opacity: 0 },
  animate: { height: "auto", opacity: 1 },
  exit: { height: 0, opacity: 0 },
  transition: { duration: 0.18, ease: "easeInOut" },
};

/** Left panel of the exam timetable page: versions of the selected exam and its constraints. */
function VersionWrapper() {
  return (
    <aside className="ctl" aria-label="Exam timetable versions and constraints">
      <div className="ctl-top">
        <CreateVersion />
      </div>
      <VersionList />
      <ConstraintNavigator />
    </aside>
  );
}
export default VersionWrapper;

function VersionList() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const exam = useSelector((state) => state.examTimetable.exam);
  const selected = useSelector((state) => state.examTimetable.timetableVersion);
  const { data, isLoading, error } = useGetExamTimetableVersions(exam?.id);
  const list = data?.data ?? [];

  return (
    <section className="ctl-group ctl-group--versions">
      <button type="button" className="ctl-group__head" onClick={() => setOpen((value) => !value)} aria-expanded={open}>
        <span className="ctl-group__title">Versions</span>
        {list.length > 0 && <span className="ctl-group__count">{list.length}</span>}
        <Icon icon="lucide:chevron-down" width={14} height={14} className={`ctl-group__chev ${open ? "is-open" : ""}`} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div className="ctl-scroll" {...collapse}>
            {isLoading ? (
              [...Array(4)].map((_, index) => <div key={index} className="ctl-skeleton" />)
            ) : error ? (
              <p className="ctl-empty ctl-empty--error">Could not load versions.</p>
            ) : !exam ? (
              <p className="ctl-empty">Select an exam to see its versions.</p>
            ) : list.length === 0 ? (
              <p className="ctl-empty">No versions yet. Create one above, or generate.</p>
            ) : (
              <ul className="ctl-list">
                {list.map((version) => {
                  const isSelected = selected?.id === version.id;
                  return (
                    <li key={version.id}>
                      <button
                        type="button"
                        className={`ctl-item ${isSelected ? "is-active" : ""}`}
                        aria-current={isSelected ? "true" : undefined}
                        onClick={() => dispatch(setExamTimetableVersion(version))}
                      >
                        <span className="ctl-item__label">{version.label}</span>
                        <span className="ctl-item__meta">
                          {version.scheduler_status === SCHEDULER_STATUS.GENERATING && (
                            <Icon icon="lucide:loader-circle" width={14} height={14} className="ctl-spin" aria-label="Generating" />
                          )}
                          {version.is_latest && <span className="ctl-tag ctl-tag--latest">Latest</span>}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function CreateVersion() {
  const exam = useSelector((state) => state.examTimetable.exam);
  const { mutate, isPending } = useCreateExamTimetableVersion();

  const create = () => {
    if (!exam) {
      toast.custom(<ToastWarning title="Exam Required" description="Select an exam before creating timetable versions." />);
      return;
    }
    if (!isPending) mutate({ exam_id: exam.id });
  };

  return (
    <button type="button" className="ctl-new" disabled={isPending} onClick={create}>
      <Icon icon={isPending ? "lucide:loader-circle" : "lucide:layers"} width={16} height={16} className={isPending ? "ctl-spin" : undefined} />
      <span>{isPending ? "Creating version…" : "New version"}</span>
      <Icon icon="lucide:plus" width={16} height={16} className="ctl-new__plus" />
    </button>
  );
}

const typeTag = (type) => {
  const value = String(type ?? "").toLowerCase();
  if (value.includes("hard")) return "hard";
  if (value.includes("soft")) return "soft";
  return null;
};

const matches = (constraint, category, query) =>
  !query ||
  query
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => [constraint.name, constraint.description, category].filter(Boolean).join(" ").toLowerCase().includes(term));

function ConstraintNavigator() {
  const { data, isLoading, error } = useGetExamTimetableConstraints();
  const exam = useSelector((state) => state.examTimetable.exam);
  const values = useSelector((state) => state.examTimetable.constraints);
  const [query, setQuery] = useState("");
  const [openIds, setOpenIds] = useState(() => new Set(["schedule_constraint"]));
  const [active, setActive] = useState(null);

  const categories = data?.data ?? [];
  const normalised = query.trim().toLowerCase();
  const filtered = useMemo(
    () =>
      categories
        .map((category) => ({ ...category, constraints: category.constraints.filter((item) => matches(item, category.category, normalised)) }))
        .filter((category) => category.constraints.length > 0),
    [categories, normalised],
  );
  const total = categories.reduce((sum, category) => sum + category.constraints.length, 0);
  const disabled = !exam;

  const toggle = (id) =>
    setOpenIds((current) => {
      const next = new Set(current);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const close = () => setActive(null);
  const Editor = active ? examTimetableConstraintMap[active.key]?.component : null;

  return (
    <section className="ctl-group ctl-group--constraints">
      <div className="ctl-group__head" role="presentation">
        <span className="ctl-group__title">Constraints</span>
        {total > 0 && <span className="ctl-group__count">{total}</span>}
      </div>

      {total > 0 && (
        <div className="ctl-search">
          <Icon icon="lucide:search" width={14} height={14} className="ctl-search__icon" />
          <input
            type="search"
            className="ctl-search__input"
            placeholder="Find a constraint"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => event.key === "Escape" && setQuery("")}
            aria-label="Find a constraint"
          />
          {query && (
            <button type="button" className="ctl-search__clear" onClick={() => setQuery("")} aria-label="Clear search">
              <Icon icon="lucide:x" width={14} height={14} />
            </button>
          )}
        </div>
      )}

      {disabled && !isLoading && !error && (
        <div className="ctl-notice">
          <Icon icon="lucide:info" width={14} height={14} />
          <span>Select an exam to configure its constraints.</span>
        </div>
      )}

      <div className="ctl-scroll">
        {isLoading ? (
          [...Array(5)].map((_, index) => <div key={index} className="ctl-skeleton" />)
        ) : error ? (
          <p className="ctl-empty ctl-empty--error">Could not load constraints.</p>
        ) : filtered.length === 0 ? (
          <p className="ctl-empty">{normalised ? `No constraints match “${query.trim()}”.` : "No constraints available."}</p>
        ) : (
          filtered.map((category) => {
            const isOpen = Boolean(normalised) || openIds.has(category.id);
            return (
              <div className="ctl-cat" key={category.id}>
                <button type="button" className="ctl-cat__head" disabled={disabled} onClick={() => toggle(category.id)} aria-expanded={isOpen}>
                  <span className="ctl-cat__icon">
                    <Icon icon={CATEGORY_ICONS[category.key] ?? "lucide:sliders-horizontal"} width={14} height={14} />
                  </span>
                  <span className="ctl-cat__name">{category.category}</span>
                  <span className="ctl-cat__count">{category.constraints.length}</span>
                  <Icon icon="lucide:chevron-down" width={14} height={14} className={`ctl-group__chev ${isOpen && !disabled ? "is-open" : ""}`} />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && !disabled && (
                    <motion.div className="ctl-cat__body" {...collapse}>
                      <ul className="ctl-cat__list">
                        {category.constraints.map((constraint) => {
                          const ready = Boolean(examTimetableConstraintMap[constraint.key]);
                          const tag = typeTag(constraint.type);
                          const count = constraintCount(values, constraint.key);
                          return (
                            <li key={constraint.id}>
                              <button
                                type="button"
                                className={`ctl-item ${active?.key === constraint.key ? "is-active" : ""}`}
                                disabled={!ready}
                                onClick={() => setActive({ ...constraint, category: category.category })}
                                title={ready ? constraint.description || constraint.name : "This constraint can't be configured yet"}
                              >
                                <span className="ctl-item__label">{constraint.name}</span>
                                <span className="ctl-item__meta">
                                  {count > 0 && <span className="ctl-tag ctl-tag--latest">{count}</span>}
                                  {!ready ? (
                                    <span className="ctl-tag ctl-tag--soon">Soon</span>
                                  ) : (
                                    tag && <span className={`ctl-tag ctl-tag--${tag}`}>{tag}</span>
                                  )}
                                </span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        )}
      </div>

      <Drawer isOpen={Boolean(Editor)} onClose={close} placement="right" title={active?.name} closeOnOutsideClick={false} showHeader={false}>
        {Editor && <Editor handleClose={close} constraint={active} />}
      </Drawer>
    </section>
  );
}

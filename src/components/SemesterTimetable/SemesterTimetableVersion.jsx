import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useCreateSemesterTimetableVersion } from "../../hooks/semesterTimetable/useCreateSemesterTimetableVersion";
import { useGetSemesterTimetableConstraints } from "../../hooks/semesterTimetable/useGetSemesterTimetableConstraint";
import { useGetSemesterTimetableVersions } from "../../hooks/semesterTimetable/useGetSemesterTimetableVersion";
import { setTimetableVersion } from "../../Slices/SemesterTimetable/semesterTimetableSlice";
import { semesterTimetableConstraintMap } from "../../utils/maps/semesterTimetable/importSemesterTimetableMap";
import { SCHEDULER_STATUS } from "../../utils/semesterTimetable/schedulerStatus";
import { Drawer } from "../drawer/Drawer";
import CustomModal from "../Modals/Modal";
import ToastWarning from "../Toast/ToastWarning";
import "./ConstraintWizard/constraintWizard.css";

const CATEGORY_ICONS = {
  schedule_constraint: "lucide:calendar-clock",
  teacher_constraint: "lucide:user-round",
  course_constraint: "lucide:book-open",
  hall_constraint: "lucide:door-open",
  assignment_constraint: "lucide:link-2",
};

const collapse = {
  initial: { height: 0, opacity: 0 },
  animate: { height: "auto", opacity: 1 },
  exit: { height: 0, opacity: 0 },
  transition: { duration: 0.18, ease: "easeInOut" },
};

function ConstraintVersionWrapper() {
  const semesterTimetable = useSelector((state) => state.semesterTimetable);
  return (
    <aside className="ctl" aria-label="Timetable versions and constraints">
      <div className="ctl-top">
        <CreateVersion semesterTimetable={semesterTimetable} />
      </div>
      <VersionList semesterTimetable={semesterTimetable} />
      <ConstraintNavigator />
    </aside>
  );
}
export default ConstraintVersionWrapper;

/* -------------------------------------------------------------------------- */
/* Versions                                                                   */
/* -------------------------------------------------------------------------- */

function VersionList({ semesterTimetable }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const selectedVersion = useSelector(
    (state) => state.semesterTimetable.timetableVersion,
  );
  const {
    data: versions,
    isLoading,
    error: versionsError,
  } = useGetSemesterTimetableVersions(semesterTimetable?.schoolSemester?.id);

  // Selecting a default version and keeping it fresh is handled by
  // useSyncSelectedTimetableVersion on the page, so a refetch (e.g. polling
  // during generation) never overrides the version the user picked.
  const list = versions?.data ?? [];

  return (
    <section className="ctl-group ctl-group--versions">
      <button
        type="button"
        className="ctl-group__head"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        <span className="ctl-group__title">Versions</span>
        {list.length > 0 && <span className="ctl-group__count">{list.length}</span>}
        <Icon
          icon="lucide:chevron-down"
          width={14}
          height={14}
          className={`ctl-group__chev ${open ? "is-open" : ""}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div className="ctl-scroll" {...collapse}>
            {isLoading ? (
              [...Array(4)].map((_, index) => (
                <div key={index} className="ctl-skeleton" />
              ))
            ) : versionsError ? (
              <p className="ctl-empty ctl-empty--error">
                Could not load versions.
              </p>
            ) : !semesterTimetable?.schoolSemester ? (
              <p className="ctl-empty">Select a semester to see its versions.</p>
            ) : list.length === 0 ? (
              <p className="ctl-empty">No versions yet. Create one above.</p>
            ) : (
              <ul className="ctl-list">
                {list.map((version) => {
                  const isSelected = selectedVersion?.id === version.id;
                  const isGenerating =
                    version.scheduler_status === SCHEDULER_STATUS.GENERATING;
                  return (
                    <li key={version.id}>
                      <button
                        type="button"
                        className={`ctl-item ${isSelected ? "is-active" : ""}`}
                        aria-current={isSelected ? "true" : undefined}
                        onClick={() => dispatch(setTimetableVersion(version))}
                      >
                        <span className="ctl-item__label">{version?.label}</span>
                        <span className="ctl-item__meta">
                          {isGenerating && (
                            <Icon
                              icon="lucide:loader-circle"
                              width={14}
                              height={14}
                              className="ctl-spin"
                              aria-label="Generating"
                            />
                          )}
                          {version.is_latest && (
                            <span className="ctl-tag ctl-tag--latest">Latest</span>
                          )}
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

function CreateVersion({ semesterTimetable }) {
  const { mutate: createTimetableVersion, isPending } =
    useCreateSemesterTimetableVersion();
  const schoolSemester = semesterTimetable?.schoolSemester;
  function handleCreateVersion() {
    if (!schoolSemester) {
      toast.custom(
        <ToastWarning
          title={"Semester Required"}
          description={
            "You Must Select A semester before you can create timetable versions"
          }
        />,
      );
      return;
    }
    if (isPending) {
      toast.custom(
        <ToastWarning
          title={"Version Currently Created"}
          description={
            "A Timetable Version Is Currently Being Created Please try again later"
          }
        />,
      );
      return;
    }
    createTimetableVersion({
      school_semester_id: semesterTimetable?.schoolSemester?.id,
    });
  }
  return (
    <button
      type="button"
      className="ctl-new"
      disabled={isPending}
      onClick={handleCreateVersion}
    >
      <Icon
        icon={isPending ? "lucide:loader-circle" : "lucide:layers"}
        width={16}
        height={16}
        className={isPending ? "ctl-spin" : undefined}
      />
      <span>{isPending ? "Creating version…" : "New version"}</span>
      <Icon icon="lucide:plus" width={16} height={16} className="ctl-new__plus" />
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* Constraints                                                                */
/* -------------------------------------------------------------------------- */

const typeTag = (type) => {
  const value = String(type ?? "").toLowerCase();
  if (value.includes("hard")) return "hard";
  if (value.includes("soft")) return "soft";
  return null;
};

const matches = (constraint, category, query) => {
  if (!query) return true;
  const haystack = [constraint.name, constraint.description, category]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return query
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
};

function ConstraintNavigator() {
  const { data: constraints, isLoading, error } =
    useGetSemesterTimetableConstraints();
  const schoolSemester = useSelector(
    (state) => state.semesterTimetable.schoolSemester,
  );
  const [query, setQuery] = useState("");
  const [openIds, setOpenIds] = useState(() => new Set());
  const [activeKey, setActiveKey] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    component: null,
    constraint: null,
    size: "md",
    closeOnOutsideClick: true,
    closeOnEscape: true,
  });
  const [drawerConfig, setDrawerConfig] = useState({
    component: null,
    constraint: null,
    placement: "right",
    title: "",
    closeOnOutsideClick: true,
    showHeader: true,
  });

  const categories = constraints?.data ?? [];
  const normalisedQuery = query.trim().toLowerCase();

  const filtered = useMemo(
    () =>
      categories
        .map((category) => ({
          ...category,
          constraints: category.constraints.filter((constraint) =>
            matches(constraint, category.category, normalisedQuery),
          ),
        }))
        .filter((category) => category.constraints.length > 0),
    [categories, normalisedQuery],
  );
  const totalConstraints = categories.reduce(
    (sum, category) => sum + category.constraints.length,
    0,
  );

  const toggleCategory = (id) =>
    setOpenIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const handleCloseModal = () => {
    setShowModal(false);
    setActiveKey(null);
    setModalConfig((prev) => ({ ...prev, component: null }));
  };

  const handleCloseDrawer = () => {
    setShowDrawer(false);
    setActiveKey(null);
    setDrawerConfig((prev) => ({ ...prev, component: null }));
  };

  const openConstraint = (constraint, category) => {
    const entry = semesterTimetableConstraintMap[constraint.key];
    if (!entry || entry.ready === false) return;
    const details = { ...constraint, category: category.category };
    setActiveKey(constraint.key);

    if (entry.editor === "modal") {
      setModalConfig({
        component: entry.component,
        constraint: details,
        size: "md",
        closeOnOutsideClick: true,
        closeOnEscape: true,
      });
      setShowModal(true);
      return;
    }

    setDrawerConfig({
      component: entry.component,
      constraint: details,
      title: constraint.name,
      placement: "right",
      closeOnOutsideClick: false,
      showHeader: false,
    });
    setShowDrawer(true);
  };

  const disabled = !schoolSemester;

  return (
    <section className="ctl-group ctl-group--constraints">
      <div className="ctl-group__head" role="presentation">
        <span className="ctl-group__title">Constraints</span>
        {totalConstraints > 0 && (
          <span className="ctl-group__count">{totalConstraints}</span>
        )}
      </div>

      {totalConstraints > 0 && (
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
            placeholder="Find a constraint"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => event.key === "Escape" && setQuery("")}
            aria-label="Find a constraint"
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

      {disabled && !isLoading && !error && (
        <div className="ctl-notice">
          <Icon icon="lucide:info" width={14} height={14} />
          <span>Select a semester to configure its constraints.</span>
        </div>
      )}

      <div className="ctl-scroll">
        {isLoading ? (
          [...Array(5)].map((_, index) => (
            <div key={index} className="ctl-skeleton" />
          ))
        ) : error ? (
          <p className="ctl-empty ctl-empty--error">
            Could not load constraints.
          </p>
        ) : filtered.length === 0 ? (
          <p className="ctl-empty">
            {normalisedQuery
              ? `No constraints match “${query.trim()}”.`
              : "No constraints available."}
          </p>
        ) : (
          filtered.map((category) => {
            const isOpen = Boolean(normalisedQuery) || openIds.has(category.id);
            return (
              <div className="ctl-cat" key={category.id}>
                <button
                  type="button"
                  className="ctl-cat__head"
                  disabled={disabled}
                  onClick={() => toggleCategory(category.id)}
                  aria-expanded={isOpen}
                >
                  <span className="ctl-cat__icon">
                    <Icon
                      icon={
                        CATEGORY_ICONS[category.key] ??
                        "lucide:sliders-horizontal"
                      }
                      width={14}
                      height={14}
                    />
                  </span>
                  <span className="ctl-cat__name">{category.category}</span>
                  <span className="ctl-cat__count">
                    {category.constraints.length}
                  </span>
                  <Icon
                    icon="lucide:chevron-down"
                    width={14}
                    height={14}
                    className={`ctl-group__chev ${isOpen && !disabled ? "is-open" : ""}`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && !disabled && (
                    <motion.div className="ctl-cat__body" {...collapse}>
                      <ul className="ctl-cat__list">
                        {category.constraints.map((constraint) => {
                          const entry =
                            semesterTimetableConstraintMap[constraint.key];
                          const ready = entry && entry.ready !== false;
                          const tag = typeTag(constraint.type);
                          return (
                            <li key={constraint.id}>
                              <button
                                type="button"
                                className={`ctl-item ${activeKey === constraint.key ? "is-active" : ""}`}
                                disabled={!ready}
                                onClick={() => openConstraint(constraint, category)}
                                title={
                                  ready
                                    ? constraint.description || constraint.name
                                    : "This constraint can't be configured yet"
                                }
                              >
                                <span className="ctl-item__label">
                                  {constraint.name}
                                </span>
                                <span className="ctl-item__meta">
                                  {!ready ? (
                                    <span className="ctl-tag ctl-tag--soon">Soon</span>
                                  ) : (
                                    tag && (
                                      <span className={`ctl-tag ctl-tag--${tag}`}>
                                        {tag}
                                      </span>
                                    )
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

      <Drawer
        isOpen={showDrawer}
        onClose={handleCloseDrawer}
        placement={drawerConfig.placement}
        title={drawerConfig.title}
        closeOnOutsideClick={drawerConfig.closeOnOutsideClick}
        showHeader={drawerConfig.showHeader}
      >
        {drawerConfig.component && (
          <drawerConfig.component
            handleClose={handleCloseDrawer}
            constraint={drawerConfig.constraint}
            drawerData={{
              ...schoolSemester,
            }}
          />
        )}
      </Drawer>

      <CustomModal
        show={showModal}
        handleClose={handleCloseModal}
        size={modalConfig.size}
        closeOnOutsideClick={modalConfig.closeOnOutsideClick}
        closeOnEscape={modalConfig.closeOnEscape}
        centered
      >
        {modalConfig.component && (
          <modalConfig.component
            rowData={{
              ...schoolSemester,
            }}
            constraint={modalConfig.constraint}
            handleClose={handleCloseModal}
          />
        )}
      </CustomModal>
    </section>
  );
}

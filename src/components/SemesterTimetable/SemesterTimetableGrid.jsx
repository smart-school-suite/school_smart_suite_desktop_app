import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  shift,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { Icon } from "@iconify/react";
import NumberFlow from "@number-flow/react";
import { useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetSchoolSemesters } from "../../hooks/schoolSemester/useGetSchoolSemesters";
import { useGenerateSemesterTimetable } from "../../hooks/semesterTimetable/useGenerateSemesterTimetable";
import { useGetSemesterTimetableVersions } from "../../hooks/semesterTimetable/useGetSemesterTimetableVersion";
import { useGetTimetableSlots } from "../../hooks/semesterTimetable/useGetTimetableSlots";
import GenerationFailedError from "../../ModalContent/SemesterTimetable/Errors/GenerationFailedError";
import {
  setSchoolSemester,
  setTimetableVersion,
} from "../../Slices/SemesterTimetable/semesterTimetableSlice";
import {
  checkConfiguration,
  handleGenerateTimetable,
} from "../../utils/semesterTimetable/generateTimetable";
import {
  hasGeneratedTimetable,
  isGenerationStale,
  SCHEDULER_STATUS,
} from "../../utils/semesterTimetable/schedulerStatus";
import BreakPeriodCard from "../Card/BreakPeriodCard";
import PeriodCard from "../Card/PeriodCard";
import { ModalButton } from "../DataTableComponents/ActionComponent";
import RectangleSkeleton from "../SkeletonPageLoader/RectangularSkeleton";
import { SingleSpinner } from "../Spinners/Spinners";

// `progress` is the latest realtime event for the selected version (or null).
// What is rendered is decided by the version's scheduler_status alone, so a
// missing or late event can never leave the page in the wrong state.
function TimetableGridWrapper({ progress = null }) {
  const semesterTimetable = useSelector((state) => state.semesterTimetable);
  const schoolSemester = semesterTimetable?.schoolSemester;
  const timetableVersion = semesterTimetable?.timetableVersion;
  const schedulerStatus = timetableVersion?.scheduler_status;
  const dispatch = useDispatch();
  const { isLoading: isVersionsLoading } = useGetSemesterTimetableVersions(
    schoolSemester?.id,
  );

  const renderContent = () => {
    if (!schoolSemester) {
      return (
        <StatusMessage
          image="./sss-maskot/timetable.png"
          title="Ready To Generate Timetable ?"
          description="Select a semester from the dropdown above to get started."
        />
      );
    }
    if (isVersionsLoading && !timetableVersion) {
      return <GridSkeleton sections={2} />;
    }
    if (hasGeneratedTimetable(timetableVersion)) {
      return <TimetableGrid />;
    }
    switch (schedulerStatus) {
      case SCHEDULER_STATUS.GENERATING:
        return (
          <GenerationProgress version={timetableVersion} progress={progress} />
        );
      case SCHEDULER_STATUS.FAILED:
        return (
          <StatusMessage
            image="./sss-maskot/error.png"
            title="Timetable Generation Failed"
            description="Please click on the button below to view the list of errors"
          >
            <div className="d-flex flex-row gap-2">
              <ModalButton
                classname="border-none p-2 rounded-3 text-white primary-background font-size-sm outline-none px-3"
                action={{ modalContent: GenerationFailedError }}
              >
                View All Errors
              </ModalButton>
              <GenerateButton label="Try Again" variant="outline" />
            </div>
          </StatusMessage>
        );
      case SCHEDULER_STATUS.ERROR:
        return (
          <StatusMessage
            image="./sss-maskot/error.png"
            title="Timetable Generation Failed"
            description="Something went wrong while generating the timetable. Consider the diagnostic report to identify and resolve constraint conflicts, then try again."
          >
            <GenerateButton label="Try Again" />
          </StatusMessage>
        );
      default:
        // "pending", or no version yet: generating creates one.
        return <TimetableGridPlaceholder />;
    }
  };

  return (
    <>
      <div
        style={{ width: "75%", height: "100%" }}
        className="d-flex flex-column align-items-center px-2 gap-2"
      >
        <div className="d-flex flex-row justify-content-center w-100">
          <SemesterDropdown
            onChange={(semester) => dispatch(setSchoolSemester(semester))}
            value={semesterTimetable.schoolSemester}
          />
        </div>
        {renderContent()}
      </div>
    </>
  );
}
export default TimetableGridWrapper;

function StatusMessage({ image, title, description, children }) {
  return (
    <div className="d-flex flex-grow-1 align-items-center justify-content-center">
      <div className="d-flex flex-column align-items-center gap-2 text-center">
        <img
          src={image}
          alt="sss-timetable-maskot"
          style={{
            height: "250px",
            width: "250px",
            objectFit: "contain",
          }}
        />
        <span className="fw-semibold font-size-sm">{title}</span>
        {description && (
          <p className="text-muted font-size-sm mb-0">{description}</p>
        )}
        {children}
      </div>
    </div>
  );
}

function GridSkeleton({ sections = 1 }) {
  return [...Array(sections)].map((_items, index) => (
    <div className="d-flex flex-column w-100 gap-2" key={index}>
      <RectangleSkeleton height="2dvh" width="25%" />
      <div className="d-flex flex-row align-items-center gap-2 flex-wrap">
        {[...Array(4)].map((_items, slotIndex) => (
          <Fragment key={slotIndex}>
            <RectangleSkeleton height="18dvh" width="49%" />
          </Fragment>
        ))}
      </div>
    </div>
  ));
}

// Starts generation for the selected version (or a new one) and selects the
// version the API returns, which is already marked "generating".
function useStartGeneration() {
  const semesterTimetable = useSelector((state) => state.semesterTimetable);
  const dispatch = useDispatch();
  const { mutate: generateTimetable, isPending } =
    useGenerateSemesterTimetable();

  const start = () => {
    if (isPending) return;
    handleGenerateTimetable(
      semesterTimetable.hard_constraints,
      generateTimetable,
      semesterTimetable.schoolSemester,
      semesterTimetable.timetableVersion,
      {
        onSuccess: (response) => {
          const version = response?.data?.version;
          if (version) dispatch(setTimetableVersion(version));
        },
      },
    );
  };

  return {
    start,
    isPending,
    isConfigured: checkConfiguration(semesterTimetable.hard_constraints),
  };
}

function GenerateButton({ label = "Generate Timetable", variant = "primary" }) {
  const { start, isPending, isConfigured } = useStartGeneration();
  if (!isConfigured) return null;
  const className =
    variant === "outline"
      ? "border p-2 rounded-3 bg-white font-size-sm outline-none px-3"
      : "border-none p-2 rounded-3 text-white primary-background font-size-sm outline-none px-3";
  return (
    <button className={className} onClick={start} disabled={isPending}>
      {isPending ? "Starting..." : label}
    </button>
  );
}

function useNow(enabled, intervalMs = 30000) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!enabled) return undefined;
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(id);
  }, [enabled, intervalMs]);
  return now;
}

function GenerationProgress({ version, progress }) {
  const queryClient = useQueryClient();
  const now = useNow(true);
  const isStale = isGenerationStale(version, progress?.receivedAt, now);

  if (isStale) {
    return (
      <StatusMessage
        image="./sss-maskot/error.png"
        title="This Is Taking Longer Than Expected"
        description="We haven't received an update for this timetable in a while. The generation may have stopped. You can check again or start a new generation."
      >
        <div className="d-flex flex-row gap-2">
          <button
            className="border p-2 rounded-3 bg-white font-size-sm outline-none px-3"
            onClick={() =>
              queryClient.invalidateQueries({
                queryKey: ["semester-timetable-versions"],
              })
            }
          >
            Check Again
          </button>
          <GenerateButton label="Generate Again" />
        </div>
      </StatusMessage>
    );
  }

  const percentage = progress?.percentage ?? 0;
  const details = progress?.isFinal
    ? "Finalizing timetable..."
    : progress?.details || "Generating timetable...";

  return (
    <>
      <div className="d-flex flex-column w-100 gap-2">
        <GridSkeleton />
      </div>
      <div className="d-flex flex-row w-100 justify-content-start gap-2 align-items-center">
        <SingleSpinner classColor={"text-iron-700"} />
        <div className="d-flex flex align-items-center gap-1">
          <span className="font-size-sm fw-bold">{details}</span>
          <span className="font-size-sm fw-semibold">
            <NumberFlow value={percentage} /> %
          </span>
        </div>
      </div>
    </>
  );
}

function TimetableGridPlaceholder() {
  const semesterTimetable = useSelector((state) => state.semesterTimetable);
  const hardConstraints = semesterTimetable.hard_constraints;
  return (
    <div className="d-flex flex-grow-1 align-items-center justify-content-center">
      <div className="d-flex flex-column align-items-center gap-2">
        <img
          src="./sss-maskot/timetable.png"
          alt="sss-timetable-maskot"
          style={{
            height: "250px",
            width: "250px",
            objectFit: "contain",
          }}
        />
        <div className="font-size-sm d-flex flex-row align-items-center gap-2">
          <span>
            Configure Operational Period{" "}
            {hardConstraints.operational_period.start_time.value} -{" "}
            {hardConstraints.operational_period.end_time.value}
          </span>
        </div>
        <div className="font-size-sm d-flex flex-row align-items-center gap-2">
          <span>
            Configure Period Duration{" "}
            {hardConstraints?.schedule_period_duration_minutes?.duration_minutes}{" "}
            minutes
          </span>
        </div>
        <div className="font-size-sm d-flex flex-row align-items-center gap-2">
          <span>
            Configure Break Period{" "}
            {hardConstraints.break_period.start_time.value} -{" "}
            {hardConstraints.break_period.end_time.value}
          </span>
        </div>
        <GenerateButton />
      </div>
    </div>
  );
}
function TimetableGrid() {
  const timetableVersion = useSelector(
    (state) => state.semesterTimetable.timetableVersion,
  );
  const { data: timetable, isLoading: isTimetableLoading } =
    useGetTimetableSlots(timetableVersion?.id);
  return (
    <>
      <div className="timetable-grid-container d-flex flex-column gap-4 pb-5">
        {isTimetableLoading
          ? [...Array(2)].map((_items, index) => (
              <Fragment key={index}>
                <div className="d-flex flex-column w-100 gap-2">
                  <RectangleSkeleton height="2dvh" width="25%" />
                  <div className="d-flex flex-row align-items-center gap-2 flex-wrap">
                    {[...Array(4)].map((_items, index) => (
                      <Fragment key={index}>
                        <RectangleSkeleton height="18dvh" width="49%" />
                      </Fragment>
                    ))}
                  </div>
                </div>
              </Fragment>
            ))
          : timetable?.data?.map((slots, index) => (
              <Fragment key={index}>
                <div className="d-flex flex-column gap-2">
                  <span className="font-size-lg fw-bold text-capitalize">
                    {slots.day}
                  </span>
                  <div className="d-flex flex-row align-items-center gap-2 flex-wrap">
                    {slots.slots.map((slot) =>
                      slot.slot_type === "break" ? (
                        <Fragment key={slot.id}>
                          <BreakPeriodCard slot={slot} />
                        </Fragment>
                      ) : (
                        <Fragment key={slot.id}>
                          <PeriodCard slot={slot} />
                        </Fragment>
                      ),
                    )}
                  </div>
                </div>
              </Fragment>
            ))}
      </div>
    </>
  );
}
function SemesterDropdown({
  value,
  defaultValue = null,
  onChange,
  buttonLabel,
}) {
  const {
    data: schoolSemesters,
    isLoading: isSchoolSemesterLoading,
    error: schoolSemesterError,
  } = useGetSchoolSemesters();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [internalValue, setInternalValue] = useState(defaultValue);
  const selected = value !== undefined ? value : internalValue;

  const { x, y, strategy, refs, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "bottom-start",
    middleware: [offset(8), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const dismiss = useDismiss(context, { outsidePress: true, escapeKey: true });
  const role = useRole(context, { role: "listbox" });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    dismiss,
    role,
  ]);

  const semesters = schoolSemesters?.data ?? [];

  const filteredSemesters = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return semesters;
    return semesters.filter((s) => {
      const haystack = [
        s?.semester_name,
        s?.school_year,
        s?.specialty_name,
        s?.level_name,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query, semesters]);

  const handleSelect = (semester) => {
    if (value === undefined) setInternalValue(semester);
    onChange?.(semester);
    setOpen(false);
  };

  useEffect(() => {
    if (!selected || !semesters.length) return;
    const stillExists = semesters.some((s) => s?.id === selected?.id);
    if (!stillExists) {
      if (value === undefined) setInternalValue(null);
      setOpen(false);
    }
  }, [schoolSemesters]);

  const renderButtonLabel = () => {
    if (buttonLabel) return buttonLabel(selected);
    if (!selected) return "Select Semester";
    return `${selected?.semester_name ?? ""} ${selected?.school_year ?? ""}, ${selected?.specialty_name ?? ""} ${selected?.level_name ?? ""}`.trim();
  };

  return (
    <>
      <div className="d-flex flex-column gap-2" style={{ width: "70%" }}>
        <button
          ref={refs.setReference}
          type="button"
          className="border-none outline-none w-100 px-2 py-2 bg-white font-size-sm d-flex flex-row gap-2 border rounded-2 justify-content-between"
          onClick={() => setOpen((v) => !v)}
          {...getReferenceProps()}
        >
          <span className="text-capitalize text-iron-700">{renderButtonLabel()}</span>
          <Icon
            icon="mi:chevron-down"
            width="16"
            height="16"
            style={{
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s ease",
            }}
          />
        </button>
        <FloatingPortal>
          <AnimatePresence>
            {open && (
              <motion.div
                ref={refs.setFloating}
                style={{
                  position: strategy,
                  top: y ?? 0,
                  left: x ?? 0,
                  zIndex: 9999,
                  minWidth: "unset",
                  width: refs.reference.current?.offsetWidth ?? "auto",
                }}
                className="bg-white p-2 rounded-4 border d-flex flex-column gap-4"
                {...getFloatingProps()}
                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={{ duration: 0.16, ease: "easeOut" }}
              >
                <div>
                  <input
                    type="search"
                    className="rounded-3 form-control font-size-sm"
                    placeholder="Search Semester"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoFocus
                  />
                </div>

                <div
                  className="semester-dd-container d-flex flex-column gap-2"
                  style={{ maxHeight: "280px", overflowY: "auto" }}
                >
                  {isSchoolSemesterLoading ? (
                    <span className="font-size-sm">Loading...</span>
                  ) : schoolSemesterError ? (
                    <span className="font-size-sm text-danger">
                      Error loading semesters
                    </span>
                  ) : filteredSemesters.length === 0 ? (
                    <span className="font-size-sm">No semesters found</span>
                  ) : (
                    filteredSemesters.map((semester, index) => {
                      const lastItem = index === filteredSemesters.length - 1;
                      const isSelected = selected?.id === semester?.id;

                      return (
                        <Fragment key={semester?.id ?? index}>
                          <button
                            type="button"
                            className="border-none transparent-bg font-size-sm w-100"
                            onClick={() => handleSelect(semester)}
                            role="option"
                            aria-selected={isSelected}
                          >
                            <div className="d-flex flex-row align-items-center justify-content-between w-100">
                              <div className="d-flex flex-column gap-1 align-items-start">
                                <span className="fw-semibold text-capitalize">
                                  {semester?.semester_name}{" "}
                                  {semester?.school_year}
                                </span>
                                <div className="d-flex flex-row align-items-center gap-1">
                                  <span>
                                    <Icon
                                      icon="mynaui:graduation-cap"
                                      width="16"
                                      height="16"
                                    />
                                  </span>
                                  <span>{semester?.specialty_name}</span>
                                  <span>
                                    <Icon
                                      icon="bi:dot"
                                      width="16"
                                      height="16"
                                    />
                                  </span>
                                  <span>{semester?.level_name}</span>
                                </div>
                              </div>

                              <div>
                                {isSelected && (
                                  <span>
                                    <Icon
                                      icon="iconamoon:check-bold"
                                      width="16"
                                      height="16"
                                    />
                                  </span>
                                )}
                              </div>
                            </div>
                          </button>

                          {!lastItem && <hr className="my-1" />}
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
    </>
  );
}

import { useQueryClient } from "@tanstack/react-query";
import { useChannel } from "ably/react";
import { useState, useMemo, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setTimetableVersion,
  setSchoolSemester,
  setTimetableVersionStatus,
  setGenerationStatus,
} from "../../Slices/Asynslices/semesterTimetableSlice";
import { checkConfiguration } from "../../utils/semesterTimetable/generateTimetable";
import NumberFlow from "@number-flow/react";
import { handleGenerateTimetable } from "../../utils/semesterTimetable/generateTimetable";
import BreakPeriodCard from "../Card/BreakPeriodCard";
import PeriodCard from "../Card/PeriodCard";
import { useGenerateSemesterTimetable } from "../../hooks/semesterTimetable/useGenerateSemesterTimetable";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import {
  autoUpdate,
  flip,
  offset,
  shift,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  FloatingPortal,
} from "@floating-ui/react";
import { useGetSchoolSemesters } from "../../hooks/schoolSemester/useGetSchoolSemesters";
import { Error } from "../errors/Error";
import { useGetTimetableSlots } from "../../hooks/semesterTimetable/useGetTimetableSlots";
import RectangleSkeleton from "../SkeletonPageLoader/RectangularSkeleton";
import { ModalButton } from "../DataTableComponents/ActionComponent";
import GenerationFailedError from "../../ModalContent/SemesterTimetable/Errors/GenerationFailedError";
import { SingleSpinner } from "../Spinners/Spinners";
function TimetableGridWrapper() {
  const semesterTimetable = useSelector((state) => state.semesterTimetable);
  const schedularStatus = semesterTimetable?.timetableVersion?.scheduler_status;
  const schoolSemester = semesterTimetable?.schoolSemester;
  const dispatch = useDispatch();
  return (
    <>
      <div
        style={{ width: "60%", height: "100%" }}
        className="d-flex flex-column align-items-center px-2 gap-2"
      >
        <div className="d-flex flex-row justify-content-center w-100">
          <SemesterDropdown
            onChange={(semester) => dispatch(setSchoolSemester(semester))}
            value={semesterTimetable.schoolSemester}
          />
        </div>
        {schoolSemester ? (
          semesterTimetable.timetableVersionStatus == "partial" ||
          semesterTimetable.timetableVersionStatus == "optimal" ? (
            <TimetableGrid />
          ) : schedularStatus == "error" ? (
            <div className="d-flex flex-grow-1 align-items-center justify-content-center">
              <div className="d-flex flex-column align-items-center gap-2 text-center">
                <img
                  src="./sss-maskot/error.png"
                  alt="sss-timetable-maskot"
                  style={{
                    height: "250px",
                    width: "250px",
                    objectFit: "contain",
                  }}
                />
                <span className="fw-semibold font-size-sm">
                  Timetable Generation Failed
                </span>
                <p className="text-muted font-size-sm mb-0">
                  Consider the diagnostic report to identify and resolve
                  constraint conflicts
                </p>
              </div>
            </div>
          ) : schedularStatus == "failed" ? (
            <>
              <div className="d-flex flex-grow-1 align-items-center justify-content-center">
                <div className="d-flex flex-column align-items-center gap-2 text-center">
                  <img
                    src="./sss-maskot/error.png"
                    alt="sss-timetable-maskot"
                    style={{
                      height: "250px",
                      width: "250px",
                      objectFit: "contain",
                    }}
                  />
                  <span className="fw-semibold font-size-sm">
                    Timetable Generation Failed
                  </span>
                  <p className="text-muted font-size-sm mb-0">
                    Please click on the button below to view the list of errors
                  </p>
                  <ModalButton
                    classname="border-none p-2 rounded-3 text-white primary-background font-size-sm outline-none px-3"
                    action={{ modalContent: GenerationFailedError }}
                  >
                    View All Errors
                  </ModalButton>
                </div>
              </div>
            </>
          ) : (
            <>
              <TimetableGridPlaceholder />
            </>
          )
        ) : (
          <div className="d-flex flex-grow-1 align-items-center justify-content-center">
            <div className="d-flex flex-column align-items-center gap-2 text-center">
              <img
                src="./sss-maskot/timetable.png"
                alt="sss-timetable-maskot"
                style={{
                  height: "250px",
                  width: "250px",
                  objectFit: "contain",
                }}
              />
              <span className="fw-semibold font-size-sm">
                Ready To Generate Timetable ?
              </span>
              <p className="text-muted font-size-sm mb-0">
                Select a semester from the dropdown above to get started.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default TimetableGridWrapper;

function TimetableGridPlaceholder() {
  const [message, setMessage] = useState(null);
  const semesterTimetable = useSelector((state) => state.semesterTimetable);
  const { mutate: generateTimetable, isPending: isGeneratingTimetable } =
    useGenerateSemesterTimetable();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const schoolAdmin = useSelector((state) => state.auth?.user?.authSchoolAdmin);
  const eventName = "semesterTimetable.generation";
  const channelName = `private:schoolBranch.${schoolAdmin.school_branch_id}.schoolAdmin.${schoolAdmin.id}.semesterTimetable`;
  useChannel(channelName, eventName, (message) => {
    if (message.data.payload.percentage === 90) {
      queryClient.invalidateQueries({
        queryKey: ["semester-timetable-versions"],
      });
      dispatch(setTimetableVersion(message.data.payload.version));
      dispatch(
        setTimetableVersionStatus(
          message.data.payload.version.scheduler_status,
        ),
      );
      setMessage("");
      dispatch(setGenerationStatus(false));
      return;
    }
    setMessage(message.data.payload);
  });
  return semesterTimetable.isGenerating ? (
    <>
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
      <div className="d-flex flex-row w-100 justify-content-start gap-2 align-items-center">
        <SingleSpinner />
        <div className="d-flex flex align-items-center">
          <span className="font-size-sm fw-bold">
            {message?.details
              ? message?.details
              : "Generating...................................."}
          </span>
          <span className="font-size-sm fw-semibold">
            <NumberFlow value={message?.percentage ? message?.percentage : 0} />{" "}
            %
          </span>
        </div>
      </div>
    </>
  ) : (
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
            {semesterTimetable.timetableVersion?.scheduler_status}
            {
              semesterTimetable.hard_constraints.operational_period.start_time
                .value
            }{" "}
            -{" "}
            {
              semesterTimetable.hard_constraints.operational_period.end_time
                .value
            }
          </span>
        </div>
        <div className="font-size-sm d-flex flex-row align-items-center gap-2">
          <span>
            Configure Period Duration{" "}
            {
              semesterTimetable.hard_constraints
                .schedule_period_duration_minutes.duration_minutes.value
            }{" "}
            minutes
          </span>
        </div>
        <div className="font-size-sm d-flex flex-row align-items-center gap-2">
          <span>
            Configure Break Period{" "}
            {semesterTimetable.hard_constraints.break_period.start_time.value} -{" "}
            {semesterTimetable.hard_constraints.break_period.end_time.value}
          </span>
        </div>
        {checkConfiguration(semesterTimetable.hard_constraints) && (
          <button
            className="border-none p-2 rounded-3 text-white primary-background font-size-sm outline-none px-3"
            onClick={() => {
              handleGenerateTimetable(
                semesterTimetable.hard_constraints,
                generateTimetable,
                semesterTimetable.schoolSemester,
              );
              dispatch(setGenerationStatus(true));
            }}
            disabled={isGeneratingTimetable || semesterTimetable.isGenerating}
          >
            Generate Timetable
          </button>
        )}
      </div>
    </div>
  );
}
function TimetableGrid() {
  const timetableVersion = useSelector(
    (state) => state.semesterTimetable.timetableVersion,
  );
  const { data: timetable, isLoading: isTimetableLoading } =
    useGetTimetableSlots(timetableVersion.id);
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
          className="border-none outline-none w-100 px-3 py-2 bg-white font-size-sm d-flex flex-row gap-2 border rounded-pill justify-content-between"
          onClick={() => setOpen((v) => !v)}
          {...getReferenceProps()}
        >
          <span className="text-capitalize">{renderButtonLabel()}</span>
          <span style={{ lineHeight: 0 }}>
            <Icon
              icon="mi:chevron-down"
              width="16"
              height="16"
              style={{
                transform: open ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease",
              }}
            />
          </span>
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

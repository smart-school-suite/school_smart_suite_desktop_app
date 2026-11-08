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
import NumberFlow from "@number-flow/react";
import { useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, ClipboardList, Users } from "lucide-react";
import { Fragment, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import DrawerTrigger from "../components/drawer/DrawerTrigger";
import RectangleSkeleton from "../components/SkeletonPageLoader/RectangularSkeleton";
import { SingleSpinner } from "../components/Spinners/Spinners";
import ToastWarning from "../components/Toast/ToastWarning";
import { useGetExams } from "../hooks/exam/useGetExams";
import { useGenerateExamTimetable } from "../hooks/examTimetableGeneration/mutations";
import { EXAM_TIMETABLE_KEYS, useGetExamTimetableSlots, useGetExamTimetableVersions } from "../hooks/examTimetableGeneration/queries";
import { setExamTimetableVersion, setTimetableExam } from "../Slices/ExamTimetable/examTimetableSlice";
import { buildGenerateRequest, configurationProblems } from "../utils/examTimetable/buildRequest";
import { hasGeneratedTimetable, isGenerationStale, SCHEDULER_STATUS } from "../utils/semesterTimetable/schedulerStatus";
import { formatExamDate } from "./constraints/fields";
import DiagnosticWrapper from "./DiagnosticWrapper";
import ExamSessionCard from "./ExamSessionCard";
import ExamTimetableStatusBar from "./ExamTimetableStatusBar";

// `progress` is the latest realtime event for the selected version (or null).
// What is shown is decided by the version's scheduler_status alone.
function GridWrapper({ progress = null }) {
  const dispatch = useDispatch();
  const { exam, timetableVersion } = useSelector((state) => state.examTimetable);
  const { isLoading: isVersionsLoading } = useGetExamTimetableVersions(exam?.id);
  const status = timetableVersion?.scheduler_status;

  const content = () => {
    if (!exam) {
      return (
        <StatusMessage
          image="./sss-maskot/timetable.png"
          title="Ready To Generate An Exam Timetable?"
          description="Select an exam from the dropdown above to get started."
        />
      );
    }
    if (isVersionsLoading && !timetableVersion) return <GridSkeleton sections={2} />;
    if (hasGeneratedTimetable(timetableVersion)) return <TimetableGrid />;

    switch (status) {
      case SCHEDULER_STATUS.GENERATING:
        return <GenerationProgress version={timetableVersion} progress={progress} />;
      case SCHEDULER_STATUS.FAILED:
        return (
          <StatusMessage
            image="./sss-maskot/error.png"
            title="Exam Timetable Generation Could Not Start"
            description="Something needs to be set up first, such as exam candidates, exam halls or invigilators. Open the list to see what to fix."
          >
            <ProblemActions />
          </StatusMessage>
        );
      case SCHEDULER_STATUS.ERROR:
        return (
          <StatusMessage
            image="./sss-maskot/error.png"
            title="The Exam Timetable Is Not Complete"
            description="Some exams could not be placed. Each problem comes with suggested solutions, checked by generating again."
          >
            <ProblemActions />
          </StatusMessage>
        );
      default:
        // "pending", or no version yet: generating creates one.
        return <ConfigurationSummary />;
    }
  };

  return (
    <div style={{ width: "75%", height: "100%" }} className="d-flex flex-column align-items-center px-2 gap-2">
      <div className="d-flex flex-row justify-content-center w-100">
        <ExamDropdown value={exam} onChange={(selected) => dispatch(setTimetableExam(selected))} />
      </div>
      {content()}
    </div>
  );
}
export default GridWrapper;

function ProblemActions() {
  return (
    <div className="d-flex flex-row align-items-center gap-2">
      <GenerateButton label="Try Again" variant="outline" />
      <DrawerTrigger title="Problems & solutions" drawerChildren={DiagnosticWrapper}>
        <button className="p-2 border-none border bg-primary-500 rounded-3 text-white border">View and Fix Problems</button>
      </DrawerTrigger>
    </div>
  );
}

function StatusMessage({ image, title, description, children }) {
  return (
    <div className="d-flex flex-grow-1 align-items-center justify-content-center">
      <div className="d-flex flex-column align-items-center gap-2 text-center" style={{ maxWidth: "32rem" }}>
        <img src={image} alt="sss-timetable-maskot" style={{ height: "150px", width: "150px", objectFit: "contain" }} />
        <span className="fw-semibold font-size-sm">{title}</span>
        {description && <p className="text-muted font-size-sm mb-0">{description}</p>}
        {children}
      </div>
    </div>
  );
}

function GridSkeleton({ sections = 1 }) {
  return [...Array(sections)].map((_item, index) => (
    <div className="d-flex flex-column w-100 gap-2" key={index}>
      <RectangleSkeleton height="2dvh" width="25%" />
      <div className="d-flex flex-row align-items-center gap-2 flex-wrap">
        {[...Array(4)].map((_slot, slotIndex) => (
          <Fragment key={slotIndex}>
            <RectangleSkeleton height="18dvh" width="49%" />
          </Fragment>
        ))}
      </div>
    </div>
  ));
}

/** Starts generation for the selected version (or a new one) and selects the version the API returns. */
function useStartGeneration() {
  const dispatch = useDispatch();
  const { exam, timetableVersion, constraints } = useSelector((state) => state.examTimetable);
  const { mutate, isPending } = useGenerateExamTimetable();
  const problems = configurationProblems(constraints);

  const start = () => {
    if (isPending || !exam) return;
    if (problems.length) {
      toast.custom(<ToastWarning title="Check The Constraints" description={problems[0].text} />);
      return;
    }
    mutate(buildGenerateRequest(exam, timetableVersion, constraints), {
      onSuccess: (response) => {
        const version = response?.data?.version;
        if (version) dispatch(setExamTimetableVersion(version));
      },
    });
  };

  return { start, isPending, problems };
}

function GenerateButton({ label = "Generate Exam Timetable", variant = "primary" }) {
  const { start, isPending } = useStartGeneration();
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

function useNow(intervalMs = 30000) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return now;
}

function GenerationProgress({ version, progress }) {
  const queryClient = useQueryClient();
  const now = useNow();

  if (isGenerationStale(version, progress?.receivedAt, now)) {
    return (
      <StatusMessage
        image="./sss-maskot/error.png"
        title="This Is Taking Longer Than Expected"
        description="We haven't received an update for this exam timetable in a while. The generation may have stopped."
      >
        <div className="d-flex flex-row gap-2">
          <button
            className="border p-2 rounded-3 bg-white font-size-sm outline-none px-3"
            onClick={() => queryClient.invalidateQueries({ queryKey: [EXAM_TIMETABLE_KEYS.versions] })}
          >
            Check Again
          </button>
          <GenerateButton label="Generate Again" />
        </div>
      </StatusMessage>
    );
  }

  return (
    <>
      <div className="d-flex flex-column w-100 gap-2">
        <GridSkeleton />
      </div>
      <div className="d-flex flex-row w-100 justify-content-start gap-2 align-items-center">
        <SingleSpinner classColor={"text-iron-700"} />
        <div className="d-flex flex align-items-center gap-1">
          <span className="font-size-sm fw-bold">
            {progress?.isFinal ? "Finalizing exam timetable..." : progress?.details || "Generating exam timetable..."}
          </span>
          <span className="font-size-sm fw-semibold">
            <NumberFlow value={progress?.percentage ?? 0} /> %
          </span>
        </div>
      </div>
    </>
  );
}

/** Before the first generation: what will be sent, and the button to generate. */
function ConfigurationSummary() {
  const { exam, constraints } = useSelector((state) => state.examTimetable);
  const { problems } = useStartGeneration();
  const op = constraints.operational_period;
  const requests =
    constraints.course_requested_slot.length +
    constraints.requested_assignment.length +
    constraints.hall_requested_slot.length +
    constraints.invigilator_requested_slot.length;

  const rows = [
    ["Exam period", exam?.start_date && exam?.end_date ? `${formatExamDate(exam.start_date?.slice(0, 10))} – ${formatExamDate(exam.end_date?.slice(0, 10))}` : "Set on the exam"],
    ["Exam hours", `${op.start_time} – ${op.end_time}${op.date_exclusions.length ? ` · ${op.date_exclusions.length} date(s) excluded` : ""}`],
    ["Exam length", `${constraints.session_duration.duration} minutes${constraints.session_duration.course_exceptions.length ? ` · ${constraints.session_duration.course_exceptions.length} exception(s)` : ""}`],
    ["Exams per day", constraints.student_daily_load_range.enabled ? `${constraints.student_daily_load_range.min_sessions} to ${constraints.student_daily_load_range.max_sessions}` : "No limit, spread over the period"],
    ["Invigilators", Number(constraints.candidates_per_invigilator) > 0 ? `One per ${constraints.candidates_per_invigilator} candidates` : "One per hall"],
    ["Requests", requests ? `${requests} request(s)` : "None"],
  ];

  return (
    <div className="d-flex flex-grow-1 align-items-center justify-content-center w-100">
      <div className="d-flex flex-column align-items-center gap-3" style={{ width: "min(30rem, 100%)" }}>
        <img src="./sss-maskot/timetable.png" alt="sss-timetable-maskot" style={{ height: "180px", width: "180px", objectFit: "contain" }} />
        <div className="border rounded-3 bg-white w-100">
          {rows.map(([label, value], index) => (
            <div key={label} className={`d-flex flex-row justify-content-between gap-3 px-3 py-2 font-size-sm ${index ? "border-top" : ""}`}>
              <span className="text-iron-500">{label}</span>
              <span className="fw-medium text-end">{value}</span>
            </div>
          ))}
        </div>
        {problems.length > 0 && (
          <span className="font-size-xs text-old-lace-700 text-center">{problems[0].text}</span>
        )}
        <span className="font-size-xs text-iron-500 text-center">
          Change these from the constraints on the left. Nobody invigilates a course they teach.
        </span>
        <GenerateButton />
      </div>
    </div>
  );
}

function TimetableGrid() {
  const version = useSelector((state) => state.examTimetable.timetableVersion);
  const { data, isLoading } = useGetExamTimetableSlots(version?.id);
  const days = data?.data ?? [];
  const examCount = useMemo(() => days.reduce((sum, day) => sum + (day.slots?.length ?? 0), 0), [days]);

  return (
    <div className="d-flex flex-column w-100 gap-2 flex-grow-1 pb-2" style={{ minHeight: 0 }}>
      <div className="timetable-grid-container d-flex flex-column gap-4 flex-grow-1" style={{ minHeight: 0, maxHeight: "none" }}>
        {isLoading ? (
          <GridSkeleton sections={2} />
        ) : (
          days.map((day) => {
            const slots = day.slots ?? [];
            const jointCount = slots.filter((slot) => slot.slot_type === "joint").length;
            return (
              <div key={day.date} className="d-flex flex-column gap-2">
                <div className="d-flex flex-row align-items-baseline gap-2">
                  <span className="font-size-lg fw-bold">{formatExamDate(day.date, "EEEE d MMMM")}</span>
                  <span className="font-size-xs text-iron-500">
                    {day.start_time} – {day.end_time}
                  </span>
                  {jointCount > 0 && (
                    <span className="d-inline-flex align-items-center gap-1 font-size-xs text-primary-700">
                      <Users size={12} /> {jointCount} joint {jointCount === 1 ? "exam" : "exams"}
                    </span>
                  )}
                </div>
                {slots.length === 0 ? (
                  <span className="font-size-sm text-iron-400">No exam on this date.</span>
                ) : (
                  <div className="d-flex flex-row align-items-stretch gap-2 flex-wrap">
                    {slots.map((slot) => (
                      <ExamSessionCard key={`${slot.course_id}-${slot.start_time}`} slot={slot} />
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
      <ExamTimetableStatusBar examCount={examCount} />
    </div>
  );
}

const STATUS_TONE = {
  upcoming: "bg-primary-50 text-primary-700",
  active: "bg-fern-50 text-fern-700",
  finished: "bg-iron-100 text-iron-600",
};

/** Exam picker, in the semester dropdown's style. */
function ExamDropdown({ value, onChange }) {
  const { data, isLoading, error } = useGetExams();
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

  // Resit exams have their own timetable.
  const exams = useMemo(() => (data?.data ?? []).filter((exam) => exam.exam_type !== "resit"), [data]);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return exams;
    return exams.filter((exam) =>
      [exam.exam_name, exam.specialty_name, exam.level_name, exam.school_year, exam.semester_name].filter(Boolean).join(" ").toLowerCase().includes(q),
    );
  }, [exams, query]);

  const title = (exam) => [exam?.exam_name, exam?.school_year].filter(Boolean).join(" · ");
  const meta = (exam) => [exam?.specialty_name, exam?.level_name].filter(Boolean).join(" · ");

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
            <span className="text-iron-500">Loading exams…</span>
          ) : value ? (
            <>
              <span className="fw-medium text-capitalize text-truncate">{title(value)}</span>
              <span className="font-size-xs text-iron-500 text-capitalize text-truncate">{meta(value)}</span>
            </>
          ) : (
            <>
              <span className="fw-medium text-iron-700">Select an exam</span>
              <span className="font-size-xs text-iron-500">Choose which exam's timetable to work on</span>
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
              <input type="search" className="rounded-3 form-control font-size-sm" placeholder="Search exam" value={query} onChange={(event) => setQuery(event.target.value)} autoFocus />
              <div className="d-flex flex-column gap-1" style={{ maxHeight: "280px", overflowY: "auto" }}>
                {isLoading ? (
                  <span className="font-size-sm">Loading...</span>
                ) : error ? (
                  <span className="font-size-sm text-danger">Error loading exams</span>
                ) : filtered.length === 0 ? (
                  <span className="font-size-sm">No exams found</span>
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
                            onChange(exam);
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

import { Icon } from "@iconify/react";
import NumberFlow from "@number-flow/react";
import { useQueryClient } from "@tanstack/react-query";
import { Users } from "lucide-react";
import { Fragment, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DrawerTrigger from "../components/drawer/DrawerTrigger";
import RectangleSkeleton from "../components/SkeletonPageLoader/RectangularSkeleton";
import { SingleSpinner } from "../components/Spinners/Spinners";
import ToastWarning from "../components/Toast/ToastWarning";
import { buildGenerateRequest, configurationProblems } from "../utils/examTimetable/buildRequest";
import { hasGeneratedTimetable, isGenerationStale, SCHEDULER_STATUS } from "../utils/semesterTimetable/schedulerStatus";
import { formatExamDate, useJointCourseReadiness } from "./constraints/fields";
import DiagnosticWrapper from "./DiagnosticWrapper";
import ExamSessionCard from "./ExamSessionCard";
import ExamTimetableStatusBar from "./ExamTimetableStatusBar";
import { useKindState, useTimetableKind } from "./TimetableKindContext";

// `progress` is the latest realtime event for the selected version (or null).
// What is shown is decided by the version's scheduler_status alone.
function GridWrapper({ progress = null }) {
  const kind = useTimetableKind();
  const dispatch = useDispatch();
  const { exam, timetableVersion } = useKindState((state) => state);
  const { isLoading: isVersionsLoading } = kind.queries.useVersions(exam?.id);
  const status = timetableVersion?.scheduler_status;

  const content = () => {
    if (!exam) {
      return (
        <StatusMessage
          image="./sss-maskot/timetable.png"
          title={`Ready To Generate ${kind.id === "exam" ? "An Exam" : "A Resit"} Timetable?`}
          description={kind.copy.selectOwner}
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
            title={`${kind.Noun} Timetable Generation Could Not Start`}
            description={kind.copy.setupFirst}
          >
            <ProblemActions />
          </StatusMessage>
        );
      case SCHEDULER_STATUS.ERROR:
        return (
          <StatusMessage
            image="./sss-maskot/error.png"
            title={`The ${kind.Noun} Timetable Is Not Complete`}
            description={`Some ${kind.noun}s could not be placed. Each problem comes with suggested solutions, checked by generating again.`}
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
        <kind.OwnerDropdown value={exam} onChange={(selected) => dispatch(kind.actions.setOwner(selected))} />
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
  const kind = useTimetableKind();
  const dispatch = useDispatch();
  const { exam, timetableVersion, constraints } = useKindState((state) => state);
  const { mutate, isPending } = kind.mutations.useGenerate();
  const problems = configurationProblems(constraints);
  // Joint courses are placed at their joint exam time, so every one needs a time first.
  const readiness = useJointCourseReadiness();
  const unscheduled = kind.joint.needsTime ? readiness.unscheduled : [];
  const isSetupLoading = readiness.isLoading;
  const blockedReason = unscheduled.length
    ? `Set the exam time of ${unscheduled.map((course) => course.course_title).join(", ")} on the Joint Course Timetable page first.`
    : null;

  const start = () => {
    if (isPending || !exam || isSetupLoading) return;
    if (blockedReason) {
      toast.custom(<ToastWarning title="Joint Courses Need A Time" description={blockedReason} />);
      return;
    }
    if (problems.length) {
      toast.custom(<ToastWarning title="Check The Constraints" description={problems[0].text} />);
      return;
    }
    mutate(buildGenerateRequest(exam, timetableVersion, constraints, kind.ownerKey), {
      onSuccess: (response) => {
        const version = response?.data?.version;
        if (version) dispatch(kind.actions.setVersion(version));
      },
    });
  };

  return { start, isPending, problems, unscheduled, blockedReason, isSetupLoading };
}

function GenerateButton({ label, variant = "primary" }) {
  const kind = useTimetableKind();
  label ??= `Generate ${kind.Noun} Timetable`;
  const { start, isPending, blockedReason, isSetupLoading } = useStartGeneration();
  const className =
    variant === "outline"
      ? "border p-2 rounded-3 bg-white font-size-sm outline-none px-3"
      : "border-none p-2 rounded-3 text-white primary-background font-size-sm outline-none px-3";
  return (
    <button
      className={`${className} ${blockedReason ? "opacity-50" : ""}`}
      onClick={start}
      disabled={isPending || isSetupLoading || Boolean(blockedReason)}
      title={blockedReason ?? undefined}
    >
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
  const kind = useTimetableKind();
  const queryClient = useQueryClient();
  const now = useNow();

  if (isGenerationStale(version, progress?.receivedAt, now)) {
    return (
      <StatusMessage
        image="./sss-maskot/error.png"
        title="This Is Taking Longer Than Expected"
        description={`We haven't received an update for this ${kind.noun} timetable in a while. The generation may have stopped.`}
      >
        <div className="d-flex flex-row gap-2">
          <button
            className="border p-2 rounded-3 bg-white font-size-sm outline-none px-3"
            onClick={() => queryClient.invalidateQueries({ queryKey: [kind.keys.versions] })}
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
            {progress?.isFinal ? `Finalizing ${kind.noun} timetable...` : progress?.details || `Generating ${kind.noun} timetable...`}
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
  const kind = useTimetableKind();
  const { exam, constraints } = useKindState((state) => state);
  const navigate = useNavigate();
  const { problems, unscheduled } = useStartGeneration();
  const { joint, scheduled } = useJointCourseReadiness();
  const op = constraints.operational_period;
  const requests =
    constraints.course_requested_slot.length +
    constraints.requested_assignment.length +
    constraints.hall_requested_slot.length +
    constraints.invigilator_requested_slot.length;

  const rows = [
    [kind.copy.period, exam?.start_date && exam?.end_date ? `${formatExamDate(exam.start_date?.slice(0, 10))} – ${formatExamDate(exam.end_date?.slice(0, 10))}` : kind.copy.periodMissing],
    ["Exam hours", `${op.start_time} – ${op.end_time}${op.date_exclusions.length ? ` · ${op.date_exclusions.length} date(s) excluded` : ""}`],
    ["Exam length", `${constraints.session_duration.duration} minutes${constraints.session_duration.course_exceptions.length ? ` · ${constraints.session_duration.course_exceptions.length} exception(s)` : ""}`],
    // ["Exams per day", constraints.student_daily_load_range.enabled ? `${constraints.student_daily_load_range.min_sessions} to ${constraints.student_daily_load_range.max_sessions}` : "No limit, spread over the period"],
    // ["Invigilators", Number(constraints.candidates_per_invigilator) > 0 ? `One per ${constraints.candidates_per_invigilator} candidates` : "One per hall"],
    // ["Requests", requests ? `${requests} request(s)` : "None"],
    kind.joint.needsTime
      ? [kind.joint.rowLabel, joint.length ? `${scheduled.length} of ${joint.length} time(s) set` : "None"]
      : [kind.joint.rowLabel, joint.length ? `${joint.length} at another specialty's time` : "None"],
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
        {unscheduled.length > 0 && (
          <div className="jcs-alert w-100 mb-0" role="alert" style={{ background: "#fdf3e3", color: "#9a5b0b" }}>
            <Icon icon="lucide:clock-alert" width={18} height={18} className="jcs-alert__icon" />
            <div className="d-flex flex-column gap-1">
              <span className="fw-semibold">Joint courses need a time before generating</span>
              <span>
                {unscheduled.map((course) => course.course_title).join(", ")} {unscheduled.length === 1 ? "is" : "are"} shared with
                other specialties and {unscheduled.length === 1 ? "has" : "have"} no exam time yet.
              </span>
              <button type="button" className="cw-text-btn jcs-link" onClick={() => navigate(kind.joint.path)}>
                <span>Configure joint course timetable</span>
                <Icon icon="lucide:arrow-up-right" width={15} height={15} />
              </button>
            </div>
          </div>
        )}
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
  const kind = useTimetableKind();
  const version = useKindState((state) => state.timetableVersion);
  const { data, isLoading } = kind.queries.useSlots(version?.id);
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
                      <Users size={12} /> {jointCount} {kind.joint.gridBadge} {jointCount === 1 ? kind.noun : `${kind.noun}s`}
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

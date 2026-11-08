import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, CalendarX, CircleAlert, CircleCheckBig, CircleDot, LayoutGrid } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import DrawerTrigger from "../components/drawer/DrawerTrigger";
import CustomModal from "../components/Modals/Modal";
import { useGetActiveExamTimetable, useGetExamTimetableSolutions } from "../hooks/examTimetableGeneration/queries";
import { SCHEDULER_STATUS } from "../utils/semesterTimetable/schedulerStatus";
import ActivateExamTimetableVersion from "./ActivateExamTimetableVersion";
import DiagnosticWrapper from "./DiagnosticWrapper";

const PILL = {
  success: "bg-fern-50 text-fern-700",
  warn: "bg-old-lace-50 text-old-lace-700",
  muted: "bg-iron-100 text-iron-600",
};

function Pill({ tone, icon: Icon, children }) {
  return (
    <span className={`d-inline-flex align-items-center gap-1 rounded-pill px-2 py-1 font-size-xs text-nowrap ${PILL[tone]}`}>
      <Icon size={12} />
      {children}
    </span>
  );
}

/** Pinned under a generated exam timetable: its state, whether it is active, and how to activate it. */
function ExamTimetableStatusBar({ examCount }) {
  const { exam, timetableVersion: version } = useSelector((state) => state.examTimetable);
  const [showActivate, setShowActivate] = useState(false);
  const isPartial = version?.scheduler_status === SCHEDULER_STATUS.PARTIAL;
  const { data: activeData, isLoading: isActiveLoading } = useGetActiveExamTimetable(exam?.id);
  const { data: solutions } = useGetExamTimetableSolutions(isPartial ? version?.id : null);

  const activeVersion = activeData?.data?.active_version;
  const isActive = !!activeVersion && activeVersion.id === version?.id;
  const examEnded = exam?.status === "finished";
  const warnings = solutions?.data?.summary?.warning_count;

  const activation = (() => {
    if (isActiveLoading) return { tone: "muted", icon: CircleDot, text: "Checking activation…" };
    if (isActive) return { tone: "success", icon: CalendarCheck, text: "Active exam timetable" };
    if (examEnded) return { tone: "muted", icon: CalendarX, text: "Exam has ended" };
    if (activeVersion) return { tone: "muted", icon: CircleDot, text: `Not active · ${activeVersion.label} is active` };
    return { tone: "warn", icon: CircleDot, text: "Not active · no exam timetable is active yet" };
  })();

  const hint = isActive
    ? `${version?.label} is the exam timetable in use; its halls and invigilators are reserved.`
    : examEnded
      ? "Timetables of an ended exam can no longer be activated."
      : activeVersion
        ? `Activate ${version?.label} to replace ${activeVersion.label}.`
        : `Activate ${version?.label} to publish it and reserve its halls and invigilators.`;

  return (
    <div className="d-flex flex-row align-items-center justify-content-between gap-3 border rounded-3 bg-white px-3 py-2 font-size-sm w-100 flex-shrink-0">
      <div className="d-flex flex-column gap-1" style={{ minWidth: 0 }}>
        <div className="d-flex align-items-center flex-wrap gap-2">
          <span className="fw-semibold">{version?.label}</span>
          {isPartial ? (
            <Pill tone="warn" icon={CircleAlert}>
              {warnings != null ? `${warnings} ${warnings === 1 ? "request" : "requests"} not honoured` : "Some requests not honoured"}
            </Pill>
          ) : (
            <Pill tone="success" icon={CircleCheckBig}>All rules respected</Pill>
          )}
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={activation.text} initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -3 }} transition={{ duration: 0.15 }}>
              <Pill tone={activation.tone} icon={activation.icon}>{activation.text}</Pill>
            </motion.span>
          </AnimatePresence>
          {examCount > 0 && (
            <span className="d-inline-flex align-items-center gap-1 font-size-xs text-iron-500">
              <LayoutGrid size={12} /> {examCount} {examCount === 1 ? "exam" : "exams"}
            </span>
          )}
        </div>
        <span className="font-size-xs text-iron-500 text-truncate">{hint}</span>
      </div>

      <div className="d-flex align-items-center gap-2 flex-shrink-0">
        {isPartial && (
          <DrawerTrigger title="Problems & solutions" drawerChildren={DiagnosticWrapper}>
            <button className="border rounded-3 bg-white px-3 py-1 font-size-sm text-nowrap">Review requests</button>
          </DrawerTrigger>
        )}
        {!isActive && !examEnded && (
          <button
            className="d-inline-flex align-items-center gap-1 border-none rounded-3 primary-background text-white px-3 py-1 font-size-sm text-nowrap"
            disabled={isActiveLoading}
            onClick={() => setShowActivate(true)}
          >
            <CalendarCheck size={14} />
            {activeVersion ? "Activate & replace" : "Activate version"}
          </button>
        )}
      </div>

      <CustomModal show={showActivate} handleClose={() => setShowActivate(false)} centered>
        {showActivate && <ActivateExamTimetableVersion version={version} handleClose={() => setShowActivate(false)} />}
      </CustomModal>
    </div>
  );
}

export default ExamTimetableStatusBar;

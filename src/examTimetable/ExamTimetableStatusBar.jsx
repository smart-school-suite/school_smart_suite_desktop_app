import { Badge, BADGE_VARIANT } from "@/components/Renderer/badges";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarCheck,
  LayoutGrid,
} from "lucide-react";
import { useState } from "react";
import DrawerTrigger from "../components/drawer/DrawerTrigger";
import CustomModal from "../components/Modals/Modal";
import { SCHEDULER_STATUS } from "../utils/semesterTimetable/schedulerStatus";
import ActivateExamTimetableVersion from "./ActivateExamTimetableVersion";
import DiagnosticWrapper from "./DiagnosticWrapper";
import { useKindState, useTimetableKind } from "./TimetableKindContext";

/** Pinned under a generated exam timetable: its state, whether it is active, and how to activate it. */
function ExamTimetableStatusBar({ examCount }) {
  const kind = useTimetableKind();
  const { exam, timetableVersion: version } = useKindState((state) => state);
  const [showActivate, setShowActivate] = useState(false);
  const isPartial = version?.scheduler_status === SCHEDULER_STATUS.PARTIAL;
  const { data: activeData, isLoading: isActiveLoading } = kind.queries.useActive(exam?.id);
  const { data: solutions } = kind.queries.useSolutions(isPartial ? version?.id : null);

  const activeVersion = activeData?.data?.active_version;
  const isActive = !!activeVersion && activeVersion.id === version?.id;
  const examEnded = exam?.status === "finished";
  const warnings = solutions?.data?.summary?.warning_count;

  const activation = (() => {
    if (isActiveLoading) return { variant: BADGE_VARIANT.NEUTRAL, icon: "lucide:circle-dot", text: "Checking activation…" };
    if (isActive) return { variant: BADGE_VARIANT.SUCCESS, icon: "lucide:calendar-check", text: `Active ${kind.noun} timetable` };
    if (examEnded) return { variant: BADGE_VARIANT.NEUTRAL, icon: "lucide:calendar-x", text: `${kind.Noun} has ended` };
    if (activeVersion) return { variant: BADGE_VARIANT.NEUTRAL, icon: "lucide:circle-dot", text: `Not active · ${activeVersion.label} is active` };
    return { variant: BADGE_VARIANT.WARNING, icon: "lucide:circle-dot", text: `Not active · no ${kind.noun} timetable is active yet` };
  })();

  const hint = isActive
    ? `${version?.label} is the ${kind.noun} timetable in use; its halls and invigilators are reserved.`
    : examEnded
      ? `Timetables of an ended ${kind.noun} can no longer be activated.`
      : activeVersion
        ? `Activate ${version?.label} to replace ${activeVersion.label}.`
        : `Activate ${version?.label} to publish it and reserve its halls and invigilators.`;

  return (
    <div className="d-flex flex-row align-items-center justify-content-between gap-3 border rounded-3 bg-white px-3 py-2 font-size-sm w-100 flex-shrink-0">
      <div className="d-flex flex-column gap-1" style={{ minWidth: 0 }}>
        <div className="d-flex align-items-center flex-wrap gap-2">
          <span className="fw-semibold">{version?.label}</span>
          {isPartial ? (
            <Badge variant={BADGE_VARIANT.WARNING} icon="lucide:circle-alert">
              {warnings != null ? `${warnings} ${warnings === 1 ? "request" : "requests"} not honoured` : "Some requests not honoured"}
            </Badge>
          ) : (
            <Badge variant={BADGE_VARIANT.SUCCESS} icon="lucide:circle-check-big">All rules respected</Badge>
          )}
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={activation.text} initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -3 }} transition={{ duration: 0.15 }}>
              <Badge variant={activation.variant} icon={activation.icon}>{activation.text}</Badge>
            </motion.span>
          </AnimatePresence>
          {examCount > 0 && (
            <span className="d-inline-flex align-items-center gap-1 font-size-xs text-iron-500">
              <LayoutGrid size={12} /> {examCount} {examCount === 1 ? kind.noun : `${kind.noun}s`}
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

import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarCheck,
  CalendarX,
  CircleAlert,
  CircleCheckBig,
  CircleDot,
  LayoutGrid,
} from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import SemesterTimetableError from "../../DrawerContent/SemesterTimetable/Error/SemesterTimetableError";
import { useGetActiveTimetable } from "../../hooks/semesterTimetable/useGetActiveTimetable";
import { useGetSemesterTimetableSolutions } from "../../hooks/semesterTimetable/useGetSemesterTimetableSolutions";
import ActivateTimetableVersion from "../../ModalContent/SemesterTimetable/ActivateTimetableVersion";
import { SCHEDULER_STATUS } from "../../utils/semesterTimetable/schedulerStatus";
import DrawerTrigger from "../drawer/DrawerTrigger";
import CustomModal from "../Modals/Modal";

const PILL = {
  success: "bg-fern-50 text-fern-700",
  warn: "bg-old-lace-50 text-old-lace-700",
  info: "bg-primary-50 text-primary-700",
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

/**
 * Pinned under a generated timetable: what state the version is in, whether
 * it is the active timetable for the semester, and how to activate it.
 */
function TimetableStatusBar({ slotCount }) {
  const { schoolSemester, timetableVersion: version } = useSelector(
    (state) => state.semesterTimetable,
  );
  const [showActivate, setShowActivate] = useState(false);
  const isPartial = version?.scheduler_status === SCHEDULER_STATUS.PARTIAL;

  const { data: activeData, isLoading: isActiveLoading } = useGetActiveTimetable(schoolSemester?.id);
  // Only partial versions need the unmet-request count; shares the drawer's cache.
  const { data: solutions } = useGetSemesterTimetableSolutions(isPartial ? version?.id : null);

  const active = activeData?.data;
  const activeVersion = active?.active_version;
  const isActive = !!activeVersion && activeVersion.id === version?.id;
  const semesterEnded = active && active.semester_still_running === false;
  const warnings = solutions?.data?.summary?.warning_count;

  const activation = (() => {
    if (isActiveLoading) return { tone: "muted", icon: CircleDot, text: "Checking activation…" };
    if (isActive) return { tone: "success", icon: CalendarCheck, text: "Active timetable" };
    if (semesterEnded) return { tone: "muted", icon: CalendarX, text: "Semester has ended" };
    if (activeVersion) return { tone: "muted", icon: CircleDot, text: `Not active · ${activeVersion.label} is active` };
    return { tone: "warn", icon: CircleDot, text: "Not active · no timetable is active yet" };
  })();

  const hint = isActive
    ? `${version?.label} is the timetable students and teachers see.`
    : semesterEnded
      ? "Timetables for an ended semester can no longer be activated."
      : activeVersion
        ? `Activate ${version?.label} to replace ${activeVersion.label} as the published timetable.`
        : `Activate ${version?.label} to publish it to students and teachers.`;

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
            <motion.span
              key={activation.text}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              transition={{ duration: 0.15 }}
            >
              <Pill tone={activation.tone} icon={activation.icon}>{activation.text}</Pill>
            </motion.span>
          </AnimatePresence>
          {slotCount > 0 && (
            <span className="d-inline-flex align-items-center gap-1 font-size-xs text-iron-500">
              <LayoutGrid size={12} /> {slotCount} {slotCount === 1 ? "lesson" : "lessons"}
            </span>
          )}
        </div>
        <span className="font-size-xs text-iron-500 text-truncate">{hint}</span>
      </div>

      <div className="d-flex align-items-center gap-2 flex-shrink-0">
        {isPartial && (
          <DrawerTrigger title="Problems & solutions" drawerChildren={SemesterTimetableError}>
            <button className="border rounded-3 bg-white px-3 py-1 font-size-sm text-nowrap">
              Review requests
            </button>
          </DrawerTrigger>
        )}
        {!isActive && !semesterEnded && (
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
        {showActivate && (
          <ActivateTimetableVersion rowData={{ version }} handleClose={() => setShowActivate(false)} />
        )}
      </CustomModal>
    </div>
  );
}

export default TimetableStatusBar;

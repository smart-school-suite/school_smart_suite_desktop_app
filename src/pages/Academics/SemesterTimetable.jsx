import { CalendarRange } from "lucide-react";
import { useSelector } from "react-redux";
import TimetableGridWrapper from "../../components/SemesterTimetable/SemesterTimetableGrid";
import ConstraintVersionWrapper from "../../components/SemesterTimetable/SemesterTimetableVersion";
import { useSyncSelectedTimetableVersion } from "../../hooks/semesterTimetable/useSyncSelectedTimetableVersion";
import { useTimetableGenerationEvents } from "../../hooks/semesterTimetable/useTimetableGenerationEvents";
function SemesterTimetable() {
  const selectedVersionId = useSelector(
    (state) => state.semesterTimetable.timetableVersion?.id ?? null,
  );
  // The server's scheduler_status drives the page. Realtime events update the
  // progress bar and trigger an early refetch; polling (while generating) and
  // a refetch on reconnect cover events that never arrive.
  useSyncSelectedTimetableVersion();
  const generationProgress = useTimetableGenerationEvents(selectedVersionId);
  return (
    <>
      <main className="main-container gap-2 font-size-sm">
       <div className="d-flex flex-column gap-1 h-100">
         <div className="page-head page-head--bar">
          <div className="d-flex align-items-center gap-2">
            <div className="light-mode-active d-flex justify-content-center align-items-center">
              <CalendarRange
                size={16}
                strokeWidth={1.5}
              />
            </div>
            <span className="fw-semibold font-size-sm">Manage Semester Timetable</span>
          </div>
        </div>
        <div
          className="d-flex flex-row align-items-start flex-grow-1"
          style={{ minHeight: 0 }}
        >
          <ConstraintVersionWrapper />
          <TimetableGridWrapper progress={generationProgress} />
        </div>
       </div>
      </main>
    </>
  );
}
export default SemesterTimetable;


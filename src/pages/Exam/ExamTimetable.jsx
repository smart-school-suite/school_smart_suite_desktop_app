import { useSelector } from "react-redux";
import GridWrapper from "../../examTimetable/GridWrapper";
import VersionWrapper from "../../examTimetable/VersionWrapper";
import { useExamTimetableGenerationEvents } from "../../hooks/examTimetableGeneration/useExamTimetableGenerationEvents";
import { useSyncSelectedExamTimetableVersion } from "../../hooks/examTimetableGeneration/useSyncSelectedExamTimetableVersion";

// Same layout and flow as the semester timetable: versions and constraints
// on the left, the exam picker and the generated timetable on the right.
function ExamTimetable() {
  const selectedVersionId = useSelector((state) => state.examTimetable.timetableVersion?.id ?? null);
  useSyncSelectedExamTimetableVersion();
  const progress = useExamTimetableGenerationEvents(selectedVersionId);

  return (
    <main className="main-container gap-2 h-100 font-size-sm">
      <div className="d-flex flex-row align-items-start flex-grow-1 h-100" style={{ minHeight: 0 }}>
        <VersionWrapper />
        <GridWrapper progress={progress} />
      </div>
    </main>
  );
}
export default ExamTimetable;

import { EXAM_TIMETABLE_KIND } from "../../examTimetable/kinds";
import TimetableOfExamsPage from "../../examTimetable/TimetableOfExamsPage";

// Same layout and flow as the semester timetable: versions and constraints
// on the left, the exam picker and the generated timetable on the right.
function ExamTimetable() {
  return <TimetableOfExamsPage kind={EXAM_TIMETABLE_KIND} />;
}
export default ExamTimetable;

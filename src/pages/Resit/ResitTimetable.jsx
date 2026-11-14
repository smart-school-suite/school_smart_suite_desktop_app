import { RESIT_TIMETABLE_KIND } from "../../examTimetable/kinds";
import TimetableOfExamsPage from "../../examTimetable/TimetableOfExamsPage";

// The exam timetable page for resit exams: each resit is placed with halls and
// invigilators, keeping apart the resits a candidate sits and respecting what
// active exam and resit timetables already use.
function ResitTimetable() {
  return <TimetableOfExamsPage kind={RESIT_TIMETABLE_KIND} />;
}
export default ResitTimetable;

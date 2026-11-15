import { TimetablePageLayout } from "./ExamTimetableLayout";

// Same tabs as the exam timetable; invigilators have their own page, as for exams.
const RESIT_TABS = [
  { title: "Resit Timetable", path: "/resit-timetable" },
  { title: "Joint Course Timetable", path: "/resit/joint-course-timetable" },
];

/** Same page head as the exam timetable, with the resit pages as tabs. */
function ResitTimetableLayout() {
  return <TimetablePageLayout heading="Manage Resit Timetable" tabs={RESIT_TABS} />;
}
export default ResitTimetableLayout;

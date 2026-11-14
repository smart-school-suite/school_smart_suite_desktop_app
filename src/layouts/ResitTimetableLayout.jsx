import { TimetablePageLayout } from "./ExamTimetableLayout";

// Invigilators have their own page, as for exams.
const RESIT_TABS = [{ title: "Resit Timetable", path: "/resit-timetable" }];

/** Same page head as the exam timetable, with the resit pages as tabs. */
function ResitTimetableLayout() {
  return <TimetablePageLayout heading="Manage Resit Timetable" tabs={RESIT_TABS} />;
}
export default ResitTimetableLayout;

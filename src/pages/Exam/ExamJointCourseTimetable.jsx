import ExamJointCourseList from "../../examJointCourse/ExamJointCourseList";
import ExamJointCourseWorkspace from "../../examJointCourse/ExamJointCourseWorkspace";

// Same layout as the semester joint course timetable: the joint exams of a
// term on the left, the selected one and its single time on the right.
function ExamJointCourseTimetable() {
  return (
    <main className="main-container gap-2 h-100 font-size-sm">
      <div className="d-flex flex-row align-items-stretch h-100" style={{ minHeight: 0 }}>
        <ExamJointCourseList />
        <ExamJointCourseWorkspace />
      </div>
    </main>
  );
}

export default ExamJointCourseTimetable;

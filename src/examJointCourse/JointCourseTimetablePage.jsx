import ExamJointCourseList from "./ExamJointCourseList";
import ExamJointCourseWorkspace from "./ExamJointCourseWorkspace";
import { JointCourseKindProvider } from "./jointCourseKinds";

/**
 * A joint course timetable page (see jointCourseKinds.js): the joint courses
 * of a term on the left, the selected one and its single time on the right.
 */
function JointCourseTimetablePage({ kind }) {
  return (
    <JointCourseKindProvider value={kind}>
      <main className="main-container gap-2 h-100 font-size-sm">
        <div className="d-flex flex-row align-items-stretch h-100" style={{ minHeight: 0 }}>
          <ExamJointCourseList />
          <ExamJointCourseWorkspace />
        </div>
      </main>
    </JointCourseKindProvider>
  );
}

export default JointCourseTimetablePage;

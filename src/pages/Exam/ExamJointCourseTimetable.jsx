import { EXAM_JOINT_COURSE_KIND } from "../../examJointCourse/jointCourseKinds";
import JointCourseTimetablePage from "../../examJointCourse/JointCourseTimetablePage";

// Same layout as the semester joint course timetable: the joint exams of a
// term on the left, the selected one and its single time on the right.
function ExamJointCourseTimetable() {
  return <JointCourseTimetablePage kind={EXAM_JOINT_COURSE_KIND} />;
}

export default ExamJointCourseTimetable;

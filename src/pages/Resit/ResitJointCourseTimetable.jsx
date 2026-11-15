import { RESIT_JOINT_COURSE_KIND } from "../../examJointCourse/jointCourseKinds";
import JointCourseTimetablePage from "../../examJointCourse/JointCourseTimetablePage";

// The joint course timetable for resits: courses students of several
// specialties resit are sat once, at the time chosen here.
function ResitJointCourseTimetable() {
  return <JointCourseTimetablePage kind={RESIT_JOINT_COURSE_KIND} />;
}

export default ResitJointCourseTimetable;

import SchedulingRequirement from "../../../DrawerContent/JointCourseTimetable/CreateJointCourseSlot/SchedulingRequirement";
import SelectJointCourseHall from "../../../DrawerContent/JointCourseTimetable/CreateJointCourseSlot/SelectJointCourseHall";
import ConfigureJointCourseSlot from "../../../DrawerContent/JointCourseTimetable/CreateJointCourseSlot/ConfigureJointCourseSlot";
import ReviewJointCourseSlot from "../../../DrawerContent/JointCourseTimetable/CreateJointCourseSlot/ReviewJointCourseSlot";

export const CREATE_JOINT_COURSE_STEP_FLOW = [
  { step: "SCHEDULING_REQUIREMENT", label: "Scheduling requirement", component: SchedulingRequirement },
  { step: "SELECT_HALL", label: "Choose a hall", component: SelectJointCourseHall },
  { step: "CONFIGURE_JOINT_COURSE_SLOT", label: "Pick the times", component: ConfigureJointCourseSlot },
  { step: "REVIEW_JOINT_COURSE_SLOT", label: "Review and save", component: ReviewJointCourseSlot },
];

import SchedulingRequirement from "../../../DrawerContent/JointCourseTimetable/CreateJointCourseSlot/SchedulingRequirement";
import ReviewJointCourseSlot from "../../../DrawerContent/JointCourseTimetable/CreateJointCourseSlot/ReviewJointCourseSlot";
import ConfigureJointCourseSlot from "../../../DrawerContent/JointCourseTimetable/CreateJointCourseSlot/ConfigureJointCourseSlot";
export const CREATE_JOINT_COURSE_STEP_FLOW = [
  {
    step: "SCHEDULING_REQUIREMENT",
    lable: "Scheduling Requirement",
    component: SchedulingRequirement,
  },
  {
    step: "CONFIGURE_JOINT_COURSE_SLOT",
    lable: "Configure Joint Course Slot",
    component: ConfigureJointCourseSlot,
  },
  {
    step: "REVIEW_JOINT_COURSE_SLOT",
    lable: "Review Joint Course Slot",
    component: ReviewJointCourseSlot,
  },
];

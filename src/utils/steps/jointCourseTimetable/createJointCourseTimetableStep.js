import ConfigureTimetableSlot from "../../../DrawerContent/JointCourseTimetable/CreateJointCourseSlot/ConfigureTimetableSlot";
import ReviewTimetableSlot from "../../../DrawerContent/JointCourseTimetable/CreateJointCourseSlot/ReviewTimetableSlot";
import SelectTeachingDays from "../../../DrawerContent/JointCourseTimetable/CreateJointCourseSlot/SelectTeachingDays";

export const CREATE_JOINT_COURSE_TIMETABLE_STEP_FLOW = [
  {
    step: "SELECT_TEACHING_DAYS",
    label: "Select Teaching Days",
    component: SelectTeachingDays,
  },
  {
    step: "CONFIGURE_TIMETABLE_SLOT",
    lable: "Configure Timetable Slot",
    component: ConfigureTimetableSlot,
  },
  {
    step: "REVIEW_TIMETABLE_SLOT",
    label: "Review Timetable slot",
    component: ReviewTimetableSlot,
  },
];

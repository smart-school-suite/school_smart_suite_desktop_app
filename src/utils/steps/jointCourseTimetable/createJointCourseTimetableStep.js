import ConfigureDailySlots from "../../../DrawerContent/JointCourseTimetable/ConfigureSlots/steps/ConfigureDailySlots";
import ConfigureTimetableSlots from "../../../DrawerContent/JointCourseTimetable/ConfigureSlots/steps/ConfigureTimetableSlots";
import ReviewTimetableSlots from "../../../DrawerContent/JointCourseTimetable/ConfigureSlots/steps/ReviewTimetableSlots";
import SelectTeachingDays from "../../../DrawerContent/JointCourseTimetable/ConfigureSlots/steps/SelectTeachingDays";
import { JOINT_COURSE_SLOT_STEPS } from "./jointCourseSlotSteps";

export const JOINT_COURSE_SLOT_STEP_FLOW = [
  {
    step: JOINT_COURSE_SLOT_STEPS.SELECT_TEACHING_DAYS,
    label: "Teaching days",
    component: SelectTeachingDays,
  },
  {
    step: JOINT_COURSE_SLOT_STEPS.CONFIGURE_DAILY_SLOTS,
    label: "Slots per day",
    component: ConfigureDailySlots,
  },
  {
    step: JOINT_COURSE_SLOT_STEPS.CONFIGURE_TIMETABLE_SLOTS,
    label: "Times and halls",
    component: ConfigureTimetableSlots,
  },
  {
    step: JOINT_COURSE_SLOT_STEPS.REVIEW_TIMETABLE_SLOTS,
    label: "Review and save",
    component: ReviewTimetableSlots,
  },
];

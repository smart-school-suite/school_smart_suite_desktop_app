import CourseRequestedSlotBuilderStep from "../../../DrawerContent/SemesterTimetable/Constraints/Course/CourseRequestedSlot/CourseRequestedSlotBuilderStep";
import CourseRequestedSlotDayStep from "../../../DrawerContent/SemesterTimetable/Constraints/Course/CourseRequestedSlot/CourseRequestedSlotDayStep";
import CourseRequestedSlotIntroductionStep from "../../../DrawerContent/SemesterTimetable/Constraints/Course/CourseRequestedSlot/CourseRequestedSlotIntroductionStep";
import CourseRequestedSlotReviewStep from "../../../DrawerContent/SemesterTimetable/Constraints/Course/CourseRequestedSlot/CourseRequestedSlotReviewStep";

export const COURSE_REQUESTED_SLOT_STEP_FLOW = [
  {
    step: "COURSE_REQUESTED_SLOT_INTRODUCTION_STEP",
    title: "Overview",
    label: "Course Requested Slot Introduction Step",
    component: CourseRequestedSlotIntroductionStep,
  },
  {
    step: "COURSE_REQUESTED_SLOT_DAYS",
    title: "Days",
    label: "Requested Assigment Days",
    component: CourseRequestedSlotDayStep,
  },
  {
    step: "COURSE_REQUESTED_SLOT_BUILDER_STEP",
    title: "Requests",
    label: "Course Requested Slot Builder Step",
    component: CourseRequestedSlotBuilderStep,
  },
  {
    step: "COURSE_REQUESTED_SLOT_REVIEW_STEP",
    title: "Review & save",
    label: "Course Requested Slot Review Step",
    component: CourseRequestedSlotReviewStep,
  },
];

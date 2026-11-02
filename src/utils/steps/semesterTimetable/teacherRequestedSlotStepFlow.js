import TeacherRequestedSlotBuilderStep from "../../../DrawerContent/SemesterTimetable/Constraints/Teacher/TeacherRequestedSlot/TeacherRequestedSlotBuilderStep";
import TeacherRequestedSlotDayStep from "../../../DrawerContent/SemesterTimetable/Constraints/Teacher/TeacherRequestedSlot/TeacherRequestedSlotDayStep";
import TeacherRequestedSlotIntroductionStep from "../../../DrawerContent/SemesterTimetable/Constraints/Teacher/TeacherRequestedSlot/TeacherRequestedSlotIntroductionStep";
import TeacherRequestedSlotListStep from "../../../DrawerContent/SemesterTimetable/Constraints/Teacher/TeacherRequestedSlot/TeacherRequestedSlotListStep";
import TeacherRequestedSlotReviewStep from "../../../DrawerContent/SemesterTimetable/Constraints/Teacher/TeacherRequestedSlot/TeacherRequestedSlotReviewStep";
export const TEACHER_REQUESTED_SLOT_STEP_FLOW = [
  {
    step: "TEACHER_REQUESTED_SLOT_INTRODUCTION_STEP",
    title: "Overview",
    label: "Teacher Requested Slot Introduction Step",
    component: TeacherRequestedSlotIntroductionStep,
  },
  {
    step: "TEACHER_REQUESTED_SLOT_DAYS",
    title: "Days",
    label: "Teacher Requested Slot Days",
    component: TeacherRequestedSlotDayStep,
  },
  {
    step: "TEACHER_REQUESTED_SLOT_LIST_STEP",
    title: "Requests",
    label: "Teacher Requested Slot List Step",
    component: TeacherRequestedSlotListStep,
  },
  {
    step: "TEACHER_REQUESTED_SLOT_BUILDER_STEP",
    title: "Time slots",
    label: "Teacher Requested Slot Builder Step",
    component: TeacherRequestedSlotBuilderStep,
  },
  {
    step: "TEACHER_REQUESTED_SLOT_REVIEW_STEP",
    title: "Review & save",
    label: "Teacher Requested Slot Review Step",
    component: TeacherRequestedSlotReviewStep,
  },
];

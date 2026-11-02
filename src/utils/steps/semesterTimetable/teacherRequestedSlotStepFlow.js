import TeacherRequestedSlotBuilderStep from "../../../DrawerContent/SemesterTimetable/Constraints/Teacher/TeacherRequestedSlot/TeacherRequestedSlotBuilderStep";
import TeacherRequestedSlotDayStep from "../../../DrawerContent/SemesterTimetable/Constraints/Teacher/TeacherRequestedSlot/TeacherRequestedSlotDayStep";
import TeacherRequestedSlotIntroductionStep from "../../../DrawerContent/SemesterTimetable/Constraints/Teacher/TeacherRequestedSlot/TeacherRequestedSlotIntroductionStep";
import TeacherRequestedSlotListStep from "../../../DrawerContent/SemesterTimetable/Constraints/Teacher/TeacherRequestedSlot/TeacherRequestedSlotListStep";
import TeacherRequestedSlotReviewStep from "../../../DrawerContent/SemesterTimetable/Constraints/Teacher/TeacherRequestedSlot/TeacherRequestedSlotReviewStep";
export const TEACHER_REQUESTED_SLOT_STEP_FLOW = [
  {
    step: "TEACHER_REQUESTED_SLOT_INTRODUCTION_STEP",
    lable: "Teacher Requested Slot Introduction Step",
    component: TeacherRequestedSlotIntroductionStep,
  },
  {
    step: "TEACHER_REQUESTED_SLOT_DAYS",
    lable: "Teacher Requested Slot Days",
    component: TeacherRequestedSlotDayStep,
  },
  {
    step: "TEACHER_REQUESTED_SLOT_LIST_STEP",
    label: "Teacher Requested Slot List Step",
    component: TeacherRequestedSlotListStep,
  },
  {
    step: "TEACHER_REQUESTED_SLOT_BUILDER_STEP",
    label: "Teacher Requested Slot Builder Step",
    component: TeacherRequestedSlotBuilderStep,
  },
  {
    step: "TEACHER_REQUESTED_SLOT_REVIEW_STEP",
    label: "Teacher Requested Slot Review Step",
    component: TeacherRequestedSlotReviewStep,
  },
];

import HallRequestedSlotBuilderStep from "../../../DrawerContent/SemesterTimetable/Constraints/Hall/HallRequestedSlot/HallRequestedSlotBuilderStep";
import HallRequestedSlotDayStep from "../../../DrawerContent/SemesterTimetable/Constraints/Hall/HallRequestedSlot/HallRequestedSlotDayStep";
import HallRequestedSlotIntroduction from "../../../DrawerContent/SemesterTimetable/Constraints/Hall/HallRequestedSlot/HallRequestedSlotIntroductionStep";
import HallRequestedSlotListStep from "../../../DrawerContent/SemesterTimetable/Constraints/Hall/HallRequestedSlot/HallRequestedSlotListStep";
import HallRequestedSlotReviewStep from "../../../DrawerContent/SemesterTimetable/Constraints/Hall/HallRequestedSlot/HallRequestedSlotReviewStep";

export const HALL_REQUESTED_SLOT_STEP_FLOW = [
  {
    step: "HALL_REQUESTED_SLOT_INTRODUCTION_STEP",
    lable: "Hall Requested Slot Introduction Step",
    component: HallRequestedSlotIntroduction,
  },
  {
    step: "HALL_REQUESTED_SLOT_DAYS",
    lable: "Requested Assigment Days",
    component: HallRequestedSlotDayStep,
  },
  {
    step: "HALL_REQUESTED_SLOT_LIST_STEP",
    label: "Hall Requested Slot List Step",
    component: HallRequestedSlotListStep,
  },
  {
    step: "HALL_REQUESTED_SLOT_BUILDER_STEP",
    label: "Hall Requested Slot Builder Step",
    component: HallRequestedSlotBuilderStep,
  },
  {
    step: "HALL_REQUESTED_SLOT_REVIEW_STEP",
    label: "Hall Requested Slot Review Step",
    component: HallRequestedSlotReviewStep,
  },
];

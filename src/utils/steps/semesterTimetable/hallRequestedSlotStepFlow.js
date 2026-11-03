import HallRequestedSlotBuilderStep from "../../../DrawerContent/SemesterTimetable/Constraints/Hall/HallRequestedSlot/HallRequestedSlotBuilderStep";
import HallRequestedSlotDayStep from "../../../DrawerContent/SemesterTimetable/Constraints/Hall/HallRequestedSlot/HallRequestedSlotDayStep";
import HallRequestedSlotIntroduction from "../../../DrawerContent/SemesterTimetable/Constraints/Hall/HallRequestedSlot/HallRequestedSlotIntroductionStep";
import HallRequestedSlotReviewStep from "../../../DrawerContent/SemesterTimetable/Constraints/Hall/HallRequestedSlot/HallRequestedSlotReviewStep";

export const HALL_REQUESTED_SLOT_STEP_FLOW = [
  {
    step: "HALL_REQUESTED_SLOT_INTRODUCTION_STEP",
    title: "Overview",
    label: "Hall Requested Slot Introduction Step",
    component: HallRequestedSlotIntroduction,
  },
  {
    step: "HALL_REQUESTED_SLOT_DAYS",
    title: "Days",
    label: "Requested Assigment Days",
    component: HallRequestedSlotDayStep,
  },
  {
    step: "HALL_REQUESTED_SLOT_BUILDER_STEP",
    title: "Requests",
    label: "Hall Requested Slot Builder Step",
    component: HallRequestedSlotBuilderStep,
  },
  {
    step: "HALL_REQUESTED_SLOT_REVIEW_STEP",
    title: "Review & save",
    label: "Hall Requested Slot Review Step",
    component: HallRequestedSlotReviewStep,
  },
];

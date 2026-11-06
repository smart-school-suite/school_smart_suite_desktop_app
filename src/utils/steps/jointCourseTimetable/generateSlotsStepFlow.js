import ChooseDaysStep from "../../../DrawerContent/JointCourseTimetable/GenerateSlots/steps/ChooseDaysStep";
import PickSlotsStep from "../../../DrawerContent/JointCourseTimetable/GenerateSlots/steps/PickSlotsStep";
import ReviewSlotsStep from "../../../DrawerContent/JointCourseTimetable/GenerateSlots/steps/ReviewSlotsStep";

export const GENERATE_SLOTS_STEPS = {
  CHOOSE_DAYS: "CHOOSE_DAYS",
  PICK_SLOTS: "PICK_SLOTS",
  REVIEW_SLOTS: "REVIEW_SLOTS",
};

export const GENERATE_SLOTS_STEP_FLOW = [
  { step: GENERATE_SLOTS_STEPS.CHOOSE_DAYS, label: "Days and duration", component: ChooseDaysStep },
  { step: GENERATE_SLOTS_STEPS.PICK_SLOTS, label: "Pick slots", component: PickSlotsStep },
  { step: GENERATE_SLOTS_STEPS.REVIEW_SLOTS, label: "Review and save", component: ReviewSlotsStep },
];

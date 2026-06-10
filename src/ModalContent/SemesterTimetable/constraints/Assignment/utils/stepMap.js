import { STEPS } from "./stepConstants";
import AssignmentBuilderStep from "../Steps/AssignmentBuilderStep";
import AssignmentListStep from "../Steps/AssignmentListStep";
import IntroductionStep from "../Steps/IntroductionStep";
import ReviewStep from "../Steps/ReviewStep";
import RequestedAssignmentDays from "../Steps/RequestedAssignmentDays";

export const STEP_MAP = {
  [STEPS.INTRODUCTION]: IntroductionStep,
  [STEPS.ASSIGNMENT_LIST]: AssignmentListStep,
  [STEPS.ASSIGNMENT_BUILDER]: AssignmentBuilderStep,
  [STEPS.REVIEW]: ReviewStep,
  [STEPS.ASSIGNMENT_DAYS]: RequestedAssignmentDays
};

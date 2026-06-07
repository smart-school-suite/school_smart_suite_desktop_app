import CustomDurationDaysStep from "../Steps/CustomDurationDaysStep";
import DefaultDurationStep from "../Steps/DefaultDurationStep";
import IntroductionStep from "../Steps/IntroductionStep";
import ReviewStep from "../Steps/ReviewStep";
import ReviewWeeklyScheduleStep from "../Steps/ReviewWeeklyScheduleStep";

import { STEPS } from "./stepConstants";

export const STEP_MAP = {
  [STEPS.INTRODUCTION]: IntroductionStep,
  [STEPS.DEFAULT_PERIOD_DURATION]: DefaultDurationStep,
  [STEPS.REVIEW_WEEKLY_SCHEDULE]: ReviewWeeklyScheduleStep,
  [STEPS.CUSTOM_DURATION_DAYS]: CustomDurationDaysStep,
  [STEPS.REVIEW]: ReviewStep,
};

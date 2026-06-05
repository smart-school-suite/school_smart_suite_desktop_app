import ConfigureFreePeriodsStep from "../Steps/ConfigureFreePeriodsStep";
import IntroductionStep from "../Steps/IntroductionStep";
import SelectDaysStep from "../Steps/SelectDaysStep";
import ReviewStep from "../Steps/ReviewStep";
import { STEPS } from "./stepConstants";

export const STEP_MAP = {
  [STEPS.INTRODUCTION]: IntroductionStep,
  [STEPS.SELECT_DAYS]: SelectDaysStep,
  [STEPS.CONFIGURE_FREE_PERIODS]: ConfigureFreePeriodsStep,
  [STEPS.REVIEW]: ReviewStep,
};

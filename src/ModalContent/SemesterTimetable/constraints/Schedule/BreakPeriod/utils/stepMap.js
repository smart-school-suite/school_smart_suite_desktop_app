import CustomBreakDayStep from "../Steps/CustomBreakDayStep";
import DefaultBreakStep from "../Steps/DefaultBreakStep";
import IntroductionStep from "../Steps/IntroductionStep";
import NoBreakDayStep from "../Steps/NoBreakDayStep";
import ReviewDefaultStep from "../Steps/ReviewDefaultStep";
import ReviewStep from "../Steps/ReviewStep";
import { STEPS } from "./stepConstants";

export const STEP_MAP = {
     [STEPS.INTRODUCTION]: IntroductionStep,
     [STEPS.CUSTOM_BREAK_DAYS]: CustomBreakDayStep,
     [STEPS.DEFAULT_BREAK_PERIOD]: DefaultBreakStep,
     [STEPS.REVIEW_DEFAULT_SCHEDULE]: ReviewDefaultStep,
     [STEPS.REVIEW]: ReviewStep,
     [STEPS.DAYS_WITHOUT_BREAKS]: NoBreakDayStep
}
import { STEPS } from "./stepConstants";
import IntroductionStep from "../Steps/IntroductionStep";
import ConfigureExceptionStep from "../Steps/ConfigureExceptionStep";
import DefaultHoursStep from "../Steps/DefaultHoursStep";
import OperatingDaysStep from "../Steps/OperatingDaysStep";
import ReviewScheduleStep from "../Steps/ReviewScheduleStep";
import ExceptionDaysStep from "../Steps/ExceptionDaysStep";
import FinalReviewStep from "../Steps/FinalReviewStep";

export const STEP_MAP = {
     [STEPS.INTRODUCTION]: IntroductionStep,
     [STEPS.CONFIGURE_EXCEPTIONS]: ConfigureExceptionStep,
     [STEPS.DEFAULT_HOURS]: DefaultHoursStep,
     [STEPS.OPERATING_DAYS]: OperatingDaysStep,
     [STEPS.REVIEW]: ReviewScheduleStep,
     [STEPS.EXCEPTION_DAYS]: ExceptionDaysStep,
     [STEPS.FINAL_REVIEW]: FinalReviewStep
}
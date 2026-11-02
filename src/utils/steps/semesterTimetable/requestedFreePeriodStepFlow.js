import ConfigureFreePeriodsStep from "../../../DrawerContent/SemesterTimetable/Constraints/FreePeriod/RequestedFreePeriod/ConfigureFreePeriodsStep";
import IntroductionStep from "../../../DrawerContent/SemesterTimetable/Constraints/FreePeriod/RequestedFreePeriod/IntroductionStep";
import ReviewStep from "../../../DrawerContent/SemesterTimetable/Constraints/FreePeriod/RequestedFreePeriod/ReviewStep";
import SelectDaysStep from "../../../DrawerContent/SemesterTimetable/Constraints/FreePeriod/RequestedFreePeriod/SelectDaysStep";

export const REQUESTED_FREE_PERIOD_STEP_FLOW = [
     {
    step: "REQUESTED_FREE_PERIOD_INTRODUCTION",
    lable: "Period Duration Introduction",
    component: IntroductionStep,
  },
  {
    step: "SELECT_DAYS_STEP",
    label: "Select Days Step",
    component: SelectDaysStep,
  },
  {
    step: "CONFIGURE_FREE_PERIOD",
    label: "Configure Fee Period",
    component: ConfigureFreePeriodsStep,
  },
  {
    step: "REVIEW",
    label: "Requested Free Period Review",
    component: ReviewStep,
  }, 
]
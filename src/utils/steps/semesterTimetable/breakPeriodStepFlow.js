import CustomBreakDayStep from "../../../DrawerContent/SemesterTimetable/Constraints/Schedule/BreakPeriod/CustomBreakDayStep";
import DefaultBreakStep from "../../../DrawerContent/SemesterTimetable/Constraints/Schedule/BreakPeriod/DefaultBreakStep";
import IntroductionStep from "../../../DrawerContent/SemesterTimetable/Constraints/Schedule/BreakPeriod/IntroductionStep";
import NoBreakDayStep from "../../../DrawerContent/SemesterTimetable/Constraints/Schedule/BreakPeriod/NoBreakDayStep";
import ReviewDefaultStep from "../../../DrawerContent/SemesterTimetable/Constraints/Schedule/BreakPeriod/ReviewDefaultStep";
import ReviewStep from "../../../DrawerContent/SemesterTimetable/Constraints/Schedule/BreakPeriod/ReviewStep";


export const BREAK_PERIOD_STEP_FLOW = [
  {
    step: "BREAK_PERIOD_INTRODUCTION_STEP",
    lable: "Break Period Introduction Step",
    component: IntroductionStep,
  },
  {
    step: "BREAK_PERIOD_DEFAULT_BREAK",
    lable: "Break Period Default Break",
    component: DefaultBreakStep,
  },
  {
    step: "BREAK_PERIOD_REVIEW_DEFAULT",
    label: "Review Default Break Period",
    component: ReviewDefaultStep,
  },
  {
    step: "BREAK_PERIOD_DAYS_WITHOUT_BREAK",
    label: "Break Period Days Without Break",
    component: NoBreakDayStep,
  },
  {
    step: "BREAK_PERIOD_CUSTOM_BREAK_DAY",
    label: "Break Period Custom Break Day",
    component: CustomBreakDayStep,
  },
  {
     step:"BREAK_PERIOD_REVIEW_STEP",
     label:"Break Period Review Step",
     component:ReviewStep
  }
];
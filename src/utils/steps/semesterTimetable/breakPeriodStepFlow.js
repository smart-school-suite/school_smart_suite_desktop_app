import CustomBreakDayStep from "../../../DrawerContent/SemesterTimetable/Constraints/Schedule/BreakPeriod/CustomBreakDayStep";
import DefaultBreakStep from "../../../DrawerContent/SemesterTimetable/Constraints/Schedule/BreakPeriod/DefaultBreakStep";
import IntroductionStep from "../../../DrawerContent/SemesterTimetable/Constraints/Schedule/BreakPeriod/IntroductionStep";
import NoBreakDayStep from "../../../DrawerContent/SemesterTimetable/Constraints/Schedule/BreakPeriod/NoBreakDayStep";
import ReviewDefaultStep from "../../../DrawerContent/SemesterTimetable/Constraints/Schedule/BreakPeriod/ReviewDefaultStep";
import ReviewStep from "../../../DrawerContent/SemesterTimetable/Constraints/Schedule/BreakPeriod/ReviewStep";


export const BREAK_PERIOD_STEP_FLOW = [
  {
    step: "BREAK_PERIOD_INTRODUCTION_STEP",
    title: "Overview",
    label: "Break Period Introduction Step",
    component: IntroductionStep,
  },
  {
    step: "BREAK_PERIOD_DEFAULT_BREAK",
    title: "Default break",
    label: "Break Period Default Break",
    component: DefaultBreakStep,
  },
  {
    step: "BREAK_PERIOD_REVIEW_DEFAULT",
    title: "Weekly coverage",
    label: "Review Default Break Period",
    component: ReviewDefaultStep,
  },
  {
    step: "BREAK_PERIOD_DAYS_WITHOUT_BREAK",
    title: "Days without a break",
    label: "Break Period Days Without Break",
    component: NoBreakDayStep,
  },
  {
    step: "BREAK_PERIOD_CUSTOM_BREAK_DAY",
    title: "Custom break days",
    label: "Break Period Custom Break Day",
    component: CustomBreakDayStep,
  },
  {
    step: "BREAK_PERIOD_REVIEW_STEP",
    title: "Review & save",
    label: "Break Period Review Step",
    component: ReviewStep,
  },
];
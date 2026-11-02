import CustomDurationDaysStep from "../../../DrawerContent/SemesterTimetable/Constraints/Schedule/PeriodDuration/CustomDurationDaysStep";
import DefaultDurationStep from "../../../DrawerContent/SemesterTimetable/Constraints/Schedule/PeriodDuration/DefaultDurationStep";
import IntroductionStep from "../../../DrawerContent/SemesterTimetable/Constraints/Schedule/PeriodDuration/IntroductionStep";
import ReviewStep from "../../../DrawerContent/SemesterTimetable/Constraints/Schedule/PeriodDuration/ReviewStep";
import ReviewWeeklyScheduleStep from "../../../DrawerContent/SemesterTimetable/Constraints/Schedule/PeriodDuration/ReviewWeeklyScheduleStep";

export const PERIOD_DURATION_STEP_FLOW = [
  {
    step: "PERIOD_DURATION_INTRODUCTION",
    lable: "Period Duration Introduction",
    component: IntroductionStep,
  },
  {
    step: "DEFAULT_PERIOD_DURATION",
    lable: "Period Duration Default",
    component: DefaultDurationStep,
  },
  {
    step: "REVIEW_WEEKLY_SCHEDULE",
    label: "Review Weekly Schedule",
    component: ReviewWeeklyScheduleStep,
  },
  {
    step: "CUSTOM_DURATION_DAYS",
    label: "Custom Duration Days",
    component: CustomDurationDaysStep,
  },
  {
    step: "REVIEW",
    label: "Duration Review",
    component: ReviewStep,
  },
];

import ConfigureExceptionStep from "../../../DrawerContent/SemesterTimetable/Constraints/Schedule/OperationalPeriod/ConfigureExceptionStep";
import DefaultHoursStep from "../../../DrawerContent/SemesterTimetable/Constraints/Schedule/OperationalPeriod/DefaultHoursStep";
import ExceptionDaysStep from "../../../DrawerContent/SemesterTimetable/Constraints/Schedule/OperationalPeriod/ExceptionDaysStep";
import FinalReviewStep from "../../../DrawerContent/SemesterTimetable/Constraints/Schedule/OperationalPeriod/FinalReviewStep";
import IntroductionStep from "../../../DrawerContent/SemesterTimetable/Constraints/Schedule/OperationalPeriod/IntroductionStep";
import OperatingDaysStep from "../../../DrawerContent/SemesterTimetable/Constraints/Schedule/OperationalPeriod/OperatingDaysStep";
import ReviewScheduleStep from "../../../DrawerContent/SemesterTimetable/Constraints/Schedule/OperationalPeriod/ReviewScheduleStep";

export const OPERATIONAL_PERIOD_STEP_FLOW = [
  {
    step: "OPERATIONAL_PERIOD_INTRODUCATION",
    lable: "Operational Period Introduction",
    component: IntroductionStep,
  },
  {
    step: "DEFAULT_OPERATIONAL_PERIOD",
    lable: "Operational Period Default",
    component: DefaultHoursStep,
  },
  {
    step: "OPERATIONAL_DAYS",
    label: "Operational Days",
    component: OperatingDaysStep,
  },
  {
    step: "OPERATIONAL_PERIOD_REVIEW",
    label: "Operational Period Review",
    component: ReviewScheduleStep,
  },
  {
    step: "OPERATIONAL_PERIOD_EXCEPTION",
    label: "Operational Period Exception",
    component: ExceptionDaysStep,
  },
  {
    step: "OPERATIONAL_PERIOD_CONFIGURE_EXCEPTION",
    label: "Operational Period Configure Exception",
    component: ConfigureExceptionStep,
  },
  {
    step: "OPERATIONAL_PERIOD_REVIEW_STEP",
    label: "Operational Period Review Step",
    component: FinalReviewStep,
  },
];

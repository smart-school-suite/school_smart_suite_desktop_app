import ConstraintWizard from "../../../../../components/SemesterTimetable/ConstraintWizard/ConstraintWizard";
import { PERIOD_DURATION_STEP_FLOW } from "../../../../../utils/steps/semesterTimetable/periodDurationStepFlow";

function PeriodDurationWizzard(props) {
  return (
    <ConstraintWizard
      flow={PERIOD_DURATION_STEP_FLOW}
      title="Period duration"
      category="Schedule constraint"
      type="hard"
      {...props}
    />
  );
}

export default PeriodDurationWizzard;

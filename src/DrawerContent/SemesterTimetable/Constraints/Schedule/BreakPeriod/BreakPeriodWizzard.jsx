import ConstraintWizard from "../../../../../components/SemesterTimetable/ConstraintWizard/ConstraintWizard";
import { BREAK_PERIOD_STEP_FLOW } from "../../../../../utils/steps/semesterTimetable/breakPeriodStepFlow";

function BreakPeriodWizzard(props) {
  return (
    <ConstraintWizard
      flow={BREAK_PERIOD_STEP_FLOW}
      title="Break period"
      category="Schedule constraint"
      type="hard"
      {...props}
    />
  );
}

export default BreakPeriodWizzard;

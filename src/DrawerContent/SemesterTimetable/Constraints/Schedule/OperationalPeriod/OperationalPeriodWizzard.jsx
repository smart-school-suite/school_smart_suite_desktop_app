import ConstraintWizard from "../../../../../components/SemesterTimetable/ConstraintWizard/ConstraintWizard";
import { OPERATIONAL_PERIOD_STEP_FLOW } from "../../../../../utils/steps/semesterTimetable/operationalPeriodStepFlow";

function OperationalPeriodWizzard(props) {
  return (
    <ConstraintWizard
      flow={OPERATIONAL_PERIOD_STEP_FLOW}
      title="Operational period"
      category="Schedule constraint"
      type="hard"
      {...props}
    />
  );
}

export default OperationalPeriodWizzard;

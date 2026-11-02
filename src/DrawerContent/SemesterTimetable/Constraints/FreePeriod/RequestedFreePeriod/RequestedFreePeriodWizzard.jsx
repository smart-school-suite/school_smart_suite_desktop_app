import ConstraintWizard from "../../../../../components/SemesterTimetable/ConstraintWizard/ConstraintWizard";
import { REQUESTED_FREE_PERIOD_STEP_FLOW } from "../../../../../utils/steps/semesterTimetable/requestedFreePeriodStepFlow";

function RequestedFreePeriodWizzard(props) {
  return (
    <ConstraintWizard
      flow={REQUESTED_FREE_PERIOD_STEP_FLOW}
      title="Requested free periods"
      category="Schedule constraint"
      type="soft"
      {...props}
    />
  );
}

export default RequestedFreePeriodWizzard;

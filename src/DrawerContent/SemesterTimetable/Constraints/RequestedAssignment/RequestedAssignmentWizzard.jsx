import ConstraintWizard from "../../../../components/SemesterTimetable/ConstraintWizard/ConstraintWizard";
import { REQUESTED_ASSIGNMENT_STEP_FLOW } from "../../../../utils/steps/semesterTimetable/requestedAssignmentStep";

function RequestedAssignmentWizzard(props) {
  return (
    <ConstraintWizard
      flow={REQUESTED_ASSIGNMENT_STEP_FLOW}
      title="Requested assignments"
      category="Assignment constraint"
      type="soft"
      {...props}
    />
  );
}

export default RequestedAssignmentWizzard;

import { RequestIntroStep } from "../RequestedSlots/RequestSteps";
import { REQUEST_CONSTRAINTS } from "../../../../utils/semesterTimetable/requestedSlots";

function RequestedAssignmentIntroductionStep(props) {
  return (
    <RequestIntroStep
      config={REQUEST_CONSTRAINTS.requested_assignments}
      {...props}
    />
  );
}

export default RequestedAssignmentIntroductionStep;

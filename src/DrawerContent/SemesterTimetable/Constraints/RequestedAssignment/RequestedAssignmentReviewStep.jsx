import { RequestReviewStep } from "../RequestedSlots/RequestSteps";
import { REQUEST_CONSTRAINTS } from "../../../../utils/semesterTimetable/requestedSlots";

function RequestedAssignmentReviewStep(props) {
  return (
    <RequestReviewStep
      config={REQUEST_CONSTRAINTS.requested_assignments}
      {...props}
    />
  );
}

export default RequestedAssignmentReviewStep;

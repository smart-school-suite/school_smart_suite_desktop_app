import { RequestDaysStep } from "../RequestedSlots/RequestSteps";
import { REQUEST_CONSTRAINTS } from "../../../../utils/semesterTimetable/requestedSlots";

function RequestedAssignmentDayStep(props) {
  return (
    <RequestDaysStep
      config={REQUEST_CONSTRAINTS.requested_assignments}
      {...props}
    />
  );
}

export default RequestedAssignmentDayStep;

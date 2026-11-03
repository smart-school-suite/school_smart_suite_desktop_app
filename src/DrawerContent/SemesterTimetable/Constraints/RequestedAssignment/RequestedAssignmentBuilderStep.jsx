import RequestConfigureStep from "../RequestedSlots/RequestConfigureStep";
import { REQUEST_CONSTRAINTS } from "../../../../utils/semesterTimetable/requestedSlots";

function RequestedAssignmentBuilderStep(props) {
  return (
    <RequestConfigureStep
      config={REQUEST_CONSTRAINTS.requested_assignments}
      {...props}
    />
  );
}

export default RequestedAssignmentBuilderStep;

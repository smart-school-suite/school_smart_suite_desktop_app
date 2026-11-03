import { RequestReviewStep } from "../../RequestedSlots/RequestSteps";
import { REQUEST_CONSTRAINTS } from "../../../../../utils/semesterTimetable/requestedSlots";

function HallRequestedSlotReviewStep(props) {
  return (
    <RequestReviewStep
      config={REQUEST_CONSTRAINTS.hall_requested_time_windows}
      {...props}
    />
  );
}

export default HallRequestedSlotReviewStep;

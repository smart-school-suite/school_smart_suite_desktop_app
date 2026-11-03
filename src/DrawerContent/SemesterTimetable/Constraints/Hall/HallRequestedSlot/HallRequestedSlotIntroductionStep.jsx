import { RequestIntroStep } from "../../RequestedSlots/RequestSteps";
import { REQUEST_CONSTRAINTS } from "../../../../../utils/semesterTimetable/requestedSlots";

function HallRequestedSlotIntroductionStep(props) {
  return (
    <RequestIntroStep
      config={REQUEST_CONSTRAINTS.hall_requested_time_windows}
      {...props}
    />
  );
}

export default HallRequestedSlotIntroductionStep;

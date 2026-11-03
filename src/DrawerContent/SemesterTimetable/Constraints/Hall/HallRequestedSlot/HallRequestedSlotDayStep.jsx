import { RequestDaysStep } from "../../RequestedSlots/RequestSteps";
import { REQUEST_CONSTRAINTS } from "../../../../../utils/semesterTimetable/requestedSlots";

function HallRequestedSlotDayStep(props) {
  return (
    <RequestDaysStep
      config={REQUEST_CONSTRAINTS.hall_requested_time_windows}
      {...props}
    />
  );
}

export default HallRequestedSlotDayStep;

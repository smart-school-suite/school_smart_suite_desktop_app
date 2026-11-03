import RequestConfigureStep from "../../RequestedSlots/RequestConfigureStep";
import { REQUEST_CONSTRAINTS } from "../../../../../utils/semesterTimetable/requestedSlots";

function HallRequestedSlotBuilderStep(props) {
  return (
    <RequestConfigureStep
      config={REQUEST_CONSTRAINTS.hall_requested_time_windows}
      {...props}
    />
  );
}

export default HallRequestedSlotBuilderStep;

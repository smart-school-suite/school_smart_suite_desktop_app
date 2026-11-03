import RequestConfigureStep from "../../RequestedSlots/RequestConfigureStep";
import { REQUEST_CONSTRAINTS } from "../../../../../utils/semesterTimetable/requestedSlots";

function TeacherRequestedSlotBuilderStep(props) {
  return (
    <RequestConfigureStep
      config={REQUEST_CONSTRAINTS.teacher_requested_time_windows}
      {...props}
    />
  );
}

export default TeacherRequestedSlotBuilderStep;

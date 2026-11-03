import { RequestDaysStep } from "../../RequestedSlots/RequestSteps";
import { REQUEST_CONSTRAINTS } from "../../../../../utils/semesterTimetable/requestedSlots";

function TeacherRequestedSlotDayStep(props) {
  return (
    <RequestDaysStep
      config={REQUEST_CONSTRAINTS.teacher_requested_time_windows}
      {...props}
    />
  );
}

export default TeacherRequestedSlotDayStep;

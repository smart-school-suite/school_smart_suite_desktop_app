import { RequestReviewStep } from "../../RequestedSlots/RequestSteps";
import { REQUEST_CONSTRAINTS } from "../../../../../utils/semesterTimetable/requestedSlots";

function TeacherRequestedSlotReviewStep(props) {
  return (
    <RequestReviewStep
      config={REQUEST_CONSTRAINTS.teacher_requested_time_windows}
      {...props}
    />
  );
}

export default TeacherRequestedSlotReviewStep;

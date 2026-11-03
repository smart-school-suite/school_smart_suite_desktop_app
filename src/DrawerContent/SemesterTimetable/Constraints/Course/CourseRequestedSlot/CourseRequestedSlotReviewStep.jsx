import { RequestReviewStep } from "../../RequestedSlots/RequestSteps";
import { REQUEST_CONSTRAINTS } from "../../../../../utils/semesterTimetable/requestedSlots";

function CourseRequestedSlotReviewStep(props) {
  return (
    <RequestReviewStep
      config={REQUEST_CONSTRAINTS.course_requested_time_slots}
      {...props}
    />
  );
}

export default CourseRequestedSlotReviewStep;

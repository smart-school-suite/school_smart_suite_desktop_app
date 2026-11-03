import { RequestIntroStep } from "../../RequestedSlots/RequestSteps";
import { REQUEST_CONSTRAINTS } from "../../../../../utils/semesterTimetable/requestedSlots";

function CourseRequestedSlotIntroductionStep(props) {
  return (
    <RequestIntroStep
      config={REQUEST_CONSTRAINTS.course_requested_time_slots}
      {...props}
    />
  );
}

export default CourseRequestedSlotIntroductionStep;

import { RequestDaysStep } from "../../RequestedSlots/RequestSteps";
import { REQUEST_CONSTRAINTS } from "../../../../../utils/semesterTimetable/requestedSlots";

function CourseRequestedSlotDayStep(props) {
  return (
    <RequestDaysStep
      config={REQUEST_CONSTRAINTS.course_requested_time_slots}
      {...props}
    />
  );
}

export default CourseRequestedSlotDayStep;

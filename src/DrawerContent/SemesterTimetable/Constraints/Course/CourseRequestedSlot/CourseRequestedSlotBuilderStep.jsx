import RequestConfigureStep from "../../RequestedSlots/RequestConfigureStep";
import { REQUEST_CONSTRAINTS } from "../../../../../utils/semesterTimetable/requestedSlots";

function CourseRequestedSlotBuilderStep(props) {
  return (
    <RequestConfigureStep
      config={REQUEST_CONSTRAINTS.course_requested_time_slots}
      {...props}
    />
  );
}

export default CourseRequestedSlotBuilderStep;

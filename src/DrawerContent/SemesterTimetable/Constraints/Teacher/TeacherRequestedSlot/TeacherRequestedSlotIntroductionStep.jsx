import { RequestIntroStep } from "../../RequestedSlots/RequestSteps";
import { REQUEST_CONSTRAINTS } from "../../../../../utils/semesterTimetable/requestedSlots";

function TeacherRequestedSlotIntroductionStep(props) {
  return (
    <RequestIntroStep
      config={REQUEST_CONSTRAINTS.teacher_requested_time_windows}
      {...props}
    />
  );
}

export default TeacherRequestedSlotIntroductionStep;

import ConstraintWizard from "../../../../../components/SemesterTimetable/ConstraintWizard/ConstraintWizard";
import { COURSE_REQUESTED_SLOT_STEP_FLOW } from "../../../../../utils/steps/semesterTimetable/courseRequestedSlotStepFlow";

function CourseRequestedSlotWizzard(props) {
  return (
    <ConstraintWizard
      flow={COURSE_REQUESTED_SLOT_STEP_FLOW}
      title="Course requested time slots"
      category="Course constraint"
      type="soft"
      {...props}
    />
  );
}

export default CourseRequestedSlotWizzard;

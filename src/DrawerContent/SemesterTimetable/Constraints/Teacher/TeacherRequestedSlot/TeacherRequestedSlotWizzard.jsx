import ConstraintWizard from "../../../../../components/SemesterTimetable/ConstraintWizard/ConstraintWizard";
import { TEACHER_REQUESTED_SLOT_STEP_FLOW } from "../../../../../utils/steps/semesterTimetable/teacherRequestedSlotStepFlow";

function TeacherRequestedSlotWizzard(props) {
  return (
    <ConstraintWizard
      flow={TEACHER_REQUESTED_SLOT_STEP_FLOW}
      title="Teacher requested time windows"
      category="Teacher constraint"
      type="soft"
      {...props}
    />
  );
}

export default TeacherRequestedSlotWizzard;

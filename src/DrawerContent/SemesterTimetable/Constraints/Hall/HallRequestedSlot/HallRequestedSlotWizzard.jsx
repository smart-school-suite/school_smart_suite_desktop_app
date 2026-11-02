import ConstraintWizard from "../../../../../components/SemesterTimetable/ConstraintWizard/ConstraintWizard";
import { HALL_REQUESTED_SLOT_STEP_FLOW } from "../../../../../utils/steps/semesterTimetable/hallRequestedSlotStepFlow";

function HallRequestedSlotWizzard(props) {
  return (
    <ConstraintWizard
      flow={HALL_REQUESTED_SLOT_STEP_FLOW}
      title="Hall requested time windows"
      category="Hall constraint"
      type="soft"
      {...props}
    />
  );
}

export default HallRequestedSlotWizzard;

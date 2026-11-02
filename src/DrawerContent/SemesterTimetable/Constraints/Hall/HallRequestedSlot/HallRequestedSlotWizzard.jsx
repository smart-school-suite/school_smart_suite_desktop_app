import { useState } from "react";
import { HALL_REQUESTED_SLOT_STEP_FLOW } from "../../../../../utils/steps/semesterTimetable/hallRequestedSlotStepFlow";
function HallRequestedSlotWizzard({ handleClose, drawerData }) {
  const [stepIndex, setStepIndex] = useState(0);
  const currentStep = HALL_REQUESTED_SLOT_STEP_FLOW[stepIndex];

  const CurrentComponent = currentStep.component;
  const nextStep = () => {
    setStepIndex((prev) => prev + 1);
  };

  const previousStep = () => {
    setStepIndex((prev) => prev - 1);
  };

  const handleNavigate = (step) => {
    setStepIndex(step);
  };
  return (
    <>
      <CurrentComponent
        handleClose={handleClose}
        currentStep={stepIndex + 1}
        nextStep={nextStep}
        previousStep={previousStep}
        fullStep={HALL_REQUESTED_SLOT_STEP_FLOW.length}
        drawerData={drawerData}
        handleNavigate={handleNavigate}
      />
    </>
  );
}
export default HallRequestedSlotWizzard;

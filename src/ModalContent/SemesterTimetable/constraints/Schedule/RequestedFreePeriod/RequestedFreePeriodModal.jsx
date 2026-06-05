import { STEP_MAP } from "./utils/stepMap";
import { STEP_FLOW } from "./utils/stepFlow";
import { useState } from "react";
function RequestedFreePeriodModal({ handleClose }) {
  const [stepIndex, setStepIndex] = useState(0);

  const currentStep = STEP_FLOW[stepIndex];

  const CurrentComponent = STEP_MAP[currentStep];
  const nextStep = () => {
    setStepIndex((prev) => prev + 1);
  };

  const previousStep = () => {
    setStepIndex((prev) => prev - 1);
  };
  return (
    <>
      <CurrentComponent
        nextStep={nextStep}
        previousStep={previousStep}
        handleClose={handleClose}
        currentStep={stepIndex + 1}
        fullStep={STEP_FLOW.length}
      />
    </>
  );
}
export default RequestedFreePeriodModal;

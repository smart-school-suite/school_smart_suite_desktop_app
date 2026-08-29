import { GRADE_SCALE_STEP_FLOW } from "../../utils/steps/gradeScale/gradeScaleStepFlow";
import { useState } from "react";
function ScaleWizzard({ handleClose, drawerData }) {
  const [stepIndex, setStepIndex] = useState(0);
  const currentStep = GRADE_SCALE_STEP_FLOW[stepIndex];

  const CurrentComponent = currentStep.component;
  const nextStep = () => {
    setStepIndex((prev) => prev + 1);
  };

  const previousStep = () => {
    setStepIndex((prev) => prev - 1);
  };
  return (
    <>
      <CurrentComponent
        handleClose={handleClose}
        currentStep={stepIndex + 1}
        nextStep={nextStep}
        previousStep={previousStep}
        fullStep={GRADE_SCALE_STEP_FLOW.length}
        drawerData={drawerData}
      />
    </>
  );
}
export default ScaleWizzard;

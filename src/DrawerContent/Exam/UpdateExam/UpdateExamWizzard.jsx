import { UPDATE_EXAM_STEP_FLOW } from "../../../utils/steps/exam/updateExamStepFlow";
import { useState } from "react";
function UpdateExamWizzard({ handleClose, drawerData }) {
  const [stepIndex, setStepIndex] = useState(0);
  const currentStep = UPDATE_EXAM_STEP_FLOW[stepIndex];

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
        fullStep={UPDATE_EXAM_STEP_FLOW.length}
        drawerData={drawerData}
      />
    </>
  );
}
export default UpdateExamWizzard;

import { CREATE_EXAM_STEP_FLOW } from "../../../utils/steps/exam/createExamStepFlow";
import { useState } from "react";
function CreateExamWizzard({ handleClose, drawerData }) {
  const [stepIndex, setStepIndex] = useState(0);
  const currentStep = CREATE_EXAM_STEP_FLOW[stepIndex];

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
        fullStep={CREATE_EXAM_STEP_FLOW.length}
        drawerData={drawerData}
      />
    </>
  );
}
export default CreateExamWizzard;

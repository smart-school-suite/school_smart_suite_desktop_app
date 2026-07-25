import { useState } from "react";
import { TEACHER_IMPORT_STEP_FLOW } from "../../../utils/steps/teacher/importStepFlow";
function TeacherImportWizzard({ handleClose }) {
  const [stepIndex, setStepIndex] = useState(0);

  const currentStep = TEACHER_IMPORT_STEP_FLOW[stepIndex];

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
        nextStep={nextStep}
        previousStep={previousStep}
        handleClose={handleClose}
        currentStep={stepIndex + 1}
        fullStep={TEACHER_IMPORT_STEP_FLOW.length}
      />
    </>
  );
}
export default TeacherImportWizzard;

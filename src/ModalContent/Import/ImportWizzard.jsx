import { TEACHER_IMPORT_STEP_FLOW } from "../../utils/steps/teacher/importStepFlow";
import { useState } from "react";
function ImportWizzard({
  moduleState,
  setImportStatus,
  setImportReset,
  setImportSelectedFile,
  handleClose,
}) {
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
        moduleState={moduleState}
        setImportStatus={setImportStatus}
        setImportReset={setImportReset}
        setImportSelectedFile={setImportSelectedFile}
      />
    </>
  );
}
export default ImportWizzard;

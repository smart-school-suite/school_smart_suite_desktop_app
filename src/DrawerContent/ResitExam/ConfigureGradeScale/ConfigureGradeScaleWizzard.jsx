import { useState } from "react";
import { CONFIGURE_GRADE_SCALE_STEP_FLOW } from "../../../utils/steps/resitExam/configureGradeScaleStepFlow";
function ConfigureGradeScaleWizzard({ handleClose, drawerData }) {
  const [stepIndex, setStepIndex] = useState(0);
  const currentStep = CONFIGURE_GRADE_SCALE_STEP_FLOW[stepIndex];

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
        fullStep={CONFIGURE_GRADE_SCALE_STEP_FLOW.length}
        drawerData={drawerData}
      />
    </>
  );
}
export default ConfigureGradeScaleWizzard;

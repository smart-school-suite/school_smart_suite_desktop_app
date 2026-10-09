import { CREATE_SCHOOL_EVENT_STEP_FLOW } from "../../../utils/steps/schoolEvent/createSchoolEventStepFlow";
import { useState } from "react";

function CreateEventWizzard({ handleClose, drawerData }) {
  const [stepIndex, setStepIndex] = useState(0);
  const currentStep = CREATE_SCHOOL_EVENT_STEP_FLOW[stepIndex];

  const CurrentComponent = currentStep.component;
  const nextStep = () => {
    setStepIndex((prev) => prev + 1);
  };

  const previousStep = () => {
    setStepIndex((prev) => prev - 1);
  };

  const handleNavigate = (step) => {
     setStepIndex(step);
  }
  return (
    <>
      <CurrentComponent
        handleClose={handleClose}
        currentStep={stepIndex + 1}
        nextStep={nextStep}
        previousStep={previousStep}
        fullStep={CREATE_SCHOOL_EVENT_STEP_FLOW.length}
        drawerData={drawerData}
        handleNavigate={handleNavigate}
      />
    </>
  );
}
export default CreateEventWizzard;

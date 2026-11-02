import { useState } from "react";
import { REQUESTED_FREE_PERIOD_STEP_FLOW } from "../../../../../utils/steps/semesterTimetable/requestedFreePeriodStepFlow";
function RequestedFreePeriodWizzard({ drawerData, handleClose }){
  const [stepIndex, setStepIndex] = useState(0);
  const currentStep = REQUESTED_FREE_PERIOD_STEP_FLOW[stepIndex];

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
        fullStep={REQUESTED_FREE_PERIOD_STEP_FLOW.length}
        drawerData={drawerData}
        handleNavigate={handleNavigate}
      />
    </>
  );
}
export default RequestedFreePeriodWizzard;
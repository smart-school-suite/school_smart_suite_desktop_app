import { useState } from "react";
import { CREATE_ANNOUNCEMENT_STEP_FLOW } from "../../../utils/steps/announcement/createAnnouncementStepFlow";
function CreateAnnouncementWizzard({ handleClose, drawerData }) {
  const [stepIndex, setStepIndex] = useState(0);
  const currentStep = CREATE_ANNOUNCEMENT_STEP_FLOW[stepIndex];

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
        fullStep={CREATE_ANNOUNCEMENT_STEP_FLOW.length}
        drawerData={drawerData}
      />
    </>
  );
}
export default CreateAnnouncementWizzard;

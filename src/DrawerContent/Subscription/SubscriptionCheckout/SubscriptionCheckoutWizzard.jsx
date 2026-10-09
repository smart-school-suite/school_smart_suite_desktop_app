import { SUBSCRIPTION_CHECKOUT_STEP_FLOW } from "../../../utils/steps/subscription/subscriptionCheckoutStepFlow";
import { useState } from "react";
function SubscriptionCheckOutWizzard({ handleClose, drawerData }) {
  const [stepIndex, setStepIndex] = useState(0);
  const currentStep = SUBSCRIPTION_CHECKOUT_STEP_FLOW[stepIndex];

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
        fullStep={SUBSCRIPTION_CHECKOUT_STEP_FLOW.length}
        drawerData={drawerData}
        handleNavigate={handleNavigate}
      />
    </>
  );
}
export default SubscriptionCheckOutWizzard;

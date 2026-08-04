import { useState } from "react";
import { GEN_FILTER_FLOW } from "../../../utils/steps/filter/generalFilterStepFlow";
function GeneralFilterWizzard({
  columns,
  cFilters,
  setCustomFilter,
  removeCustomFilter,
  moduleState
}) {
  const [stepIndex, setStepIndex] = useState(0);

  const currentStep = GEN_FILTER_FLOW[stepIndex];

  const CurrentComponent = currentStep.component;
  const nextStep = () => {
    setStepIndex((prev) => prev + 1);
  };

  const previousStep = () => {
    setStepIndex((prev) => prev - 1);
  };
  return (
    <CurrentComponent
      cFilters={cFilters}
      columns={columns}
      nextStep={nextStep}
      previousStep={previousStep}
      currentStep={stepIndex + 1}
      setCustomFilter={setCustomFilter}
      removeCustomFilter={removeCustomFilter}
      moduleState={moduleState}
    />
  );
}
export default GeneralFilterWizzard;

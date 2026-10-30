import { CREATE_EXAM_STEP_FLOW } from "../../../utils/steps/exam/createExamStepFlow";
import { useState } from "react";
import { useSelector } from "react-redux";

const isSelected = (value) => Boolean(value?.id);

function CreateExamWizzard({ handleClose, drawerData }) {
  const moduleState = useSelector((state) => state.exam.createExam);
  const [stepIndex, setStepIndex] = useState(0);

  // Never render a step whose required selections are missing (e.g. after a reset),
  // fall back to the first step that still needs input instead of crashing
  const firstBlockedIndex = CREATE_EXAM_STEP_FLOW.findIndex((step) =>
    step.requires.some((field) => !isSelected(moduleState?.[field])),
  );
  const safeStepIndex =
    firstBlockedIndex === -1
      ? stepIndex
      : Math.min(stepIndex, Math.max(firstBlockedIndex - 1, 0));

  const currentStep = CREATE_EXAM_STEP_FLOW[safeStepIndex];
  const CurrentComponent = currentStep.component;

  const nextStep = () => {
    setStepIndex(
      Math.min(safeStepIndex + 1, CREATE_EXAM_STEP_FLOW.length - 1),
    );
  };

  const previousStep = () => {
    setStepIndex(Math.max(safeStepIndex - 1, 0));
  };

  return (
    <CurrentComponent
      handleClose={handleClose}
      currentStep={safeStepIndex + 1}
      nextStep={nextStep}
      previousStep={previousStep}
      fullStep={CREATE_EXAM_STEP_FLOW.length}
      drawerData={drawerData}
    />
  );
}
export default CreateExamWizzard;

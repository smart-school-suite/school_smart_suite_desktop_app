import { CREATE_EXAM_STEP_FLOW } from "../../../utils/steps/exam/createExamStepFlow";
import { getSafeStepIndex } from "../../../utils/steps/getSafeStepIndex";
import { resetCreateExamState } from "../../../Slices/exam/examSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function CreateExamWizzard({ handleClose, drawerData }) {
  const dispatch = useDispatch();
  const moduleState = useSelector((state) => state.exam.createExam);
  const [stepIndex, setStepIndex] = useState(0);

  // Clear selections however the drawer is closed, so they never leak into the next wizard
  useEffect(() => {
    return () => {
      dispatch(resetCreateExamState());
    };
  }, [dispatch]);

  const safeStepIndex = getSafeStepIndex(
    CREATE_EXAM_STEP_FLOW,
    stepIndex,
    moduleState,
  );
  const CurrentComponent = CREATE_EXAM_STEP_FLOW[safeStepIndex].component;

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

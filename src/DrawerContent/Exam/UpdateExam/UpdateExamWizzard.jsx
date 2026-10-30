import { UPDATE_EXAM_STEP_FLOW } from "../../../utils/steps/exam/updateExamStepFlow";
import { getSafeStepIndex } from "../../../utils/steps/getSafeStepIndex";
import {
  resetCreateExamState,
  setCreateExamValue,
} from "../../../Slices/exam/examSlice";
import { useGetExamDetails } from "../../../hooks/exam/useGetExamDetails";
import RectangleSkeleton from "../../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../../components/errors/Error";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function UpdateExamWizzard({ handleClose, drawerData }) {
  const dispatch = useDispatch();
  const moduleState = useSelector((state) => state.exam.createExam);
  const [stepIndex, setStepIndex] = useState(0);
  const hasPrefilled = useRef(false);

  const {
    data: examDetails,
    isLoading,
    error,
  } = useGetExamDetails(drawerData?.id);

  // Pre-fill the current exam type / academic year once, so going back to a step
  // never overwrites what the user has since selected
  useEffect(() => {
    const exam = examDetails?.data;
    if (hasPrefilled.current || !exam) return;
    hasPrefilled.current = true;
    if (exam.exam_type) {
      dispatch(setCreateExamValue({ field: "examType", value: exam.exam_type }));
    }
    if (exam.school_year) {
      dispatch(
        setCreateExamValue({ field: "academicYear", value: exam.school_year }),
      );
    }
  }, [dispatch, examDetails]);

  // Clear selections however the drawer is closed, so they never leak into the next wizard
  useEffect(() => {
    return () => {
      hasPrefilled.current = false;
      dispatch(resetCreateExamState());
    };
  }, [dispatch]);

  const safeStepIndex = getSafeStepIndex(
    UPDATE_EXAM_STEP_FLOW,
    stepIndex,
    moduleState,
  );
  const CurrentComponent = UPDATE_EXAM_STEP_FLOW[safeStepIndex].component;

  const nextStep = () => {
    setStepIndex(
      Math.min(safeStepIndex + 1, UPDATE_EXAM_STEP_FLOW.length - 1),
    );
  };

  const previousStep = () => {
    setStepIndex(Math.max(safeStepIndex - 1, 0));
  };

  if (isLoading || error) {
    return (
      <>
        <div className="d-flex flex-row align-items-center justify-content-between border-bottom p-2 font-size-sm">
          <span className="fw-medium">Update Exam</span>
          <button
            type="button"
            className="bg-none border-none border rounded-circle"
            aria-label="Close drawer"
            onClick={handleClose}
            style={{
              width: "2rem",
              height: "2rem",
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
            }}
          >
            <X size={16} />
          </button>
        </div>
        <div className="drawer-content px-2 font-size-sm pt-2 pb-5">
          {isLoading ? (
            <div className="d-flex flex-column gap-2 px-2">
              {[...Array(6)].map((_, index) => (
                <RectangleSkeleton key={index} height="20dvh" width="100%" />
              ))}
            </div>
          ) : (
            <NotFoundError
              title={error?.response?.data?.errors?.title}
              description={error?.response?.data?.errors?.description}
            />
          )}
        </div>
      </>
    );
  }

  return (
    <CurrentComponent
      handleClose={handleClose}
      currentStep={safeStepIndex + 1}
      nextStep={nextStep}
      previousStep={previousStep}
      fullStep={UPDATE_EXAM_STEP_FLOW.length}
      drawerData={drawerData}
    />
  );
}
export default UpdateExamWizzard;

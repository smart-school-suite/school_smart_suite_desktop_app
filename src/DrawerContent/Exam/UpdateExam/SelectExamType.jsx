import { useDispatch, useSelector } from "react-redux";
import { Dot, X, BookOpenCheck, CircleCheck } from "lucide-react";
import HorizontalDashedLine from "../../../components/DashedLine/HorizonetalDashedLine";
import { Fragment, useEffect } from "react";
import { useGetExamTypes } from "../../../ModalContent/ExamType/useGetExamType";
import { motion, AnimatePresence } from "framer-motion";
import { NotFoundError } from "../../../components/errors/Error";
import RectangleSkeleton from "../../../components/SkeletonPageLoader/RectangularSkeleton";
import { useGetExamDetails } from "../../../hooks/exam/useGetExamDetails";
import {
  setCreateExamValue,
  resetCreateExamState,
} from "../../../Slices/exam/examSlice";

function SelectExamType({
  handleClose,
  nextStep,
  fullStep,
  currentStep,
  drawerData,
}) {
  const dispatch = useDispatch();
  const examId = drawerData?.id;

  const { data: examDetails, isLoading: isExamLoading } =
    useGetExamDetails(examId);
  const { data: examTypes, isLoading, error } = useGetExamTypes();
  const moduleState = useSelector((state) => state.exam.createExam);

  useEffect(() => {
    if (!isExamLoading && examDetails?.data) {
      if (examDetails.data.exam_type) {
        dispatch(
          setCreateExamValue({
            field: "examType",
            value: examDetails.data.exam_type,
          }),
        );
      }
      if (examDetails.data.school_year) {
        dispatch(
          setCreateExamValue({
            field: "academicYear",
            value: examDetails.data.school_year,
          }),
        );
      }
    }
  }, [dispatch, isExamLoading, examDetails, examId]);

  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between border-bottom p-2 font-size-sm">
        <span className="fw-medium">Update Exam</span>
        <button
          className="bg-none border-none border rounded-circle"
          aria-label="Close drawer"
          onClick={() => {
            dispatch(resetCreateExamState());
            handleClose();
          }}
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
        {isLoading || isExamLoading ? (
          <div className="d-flex flex-column gap-2 px-2">
            {[...Array(8)].map((_, index) => (
              <Fragment key={index}>
                <RectangleSkeleton height="20dvh" width="100%" />
              </Fragment>
            ))}
          </div>
        ) : error ? (
          <>
            <NotFoundError
              title={error?.response?.data?.errors?.title}
              description={error?.response?.data?.errors?.description}
            />
          </>
        ) : (
          <div className="d-flex flex-column gap-2">
            <div className="d-flex flex-row justify-content-end">
              <span className="text-end fw-medium text-capitalize">
                {`step ${currentStep} of ${fullStep} completed`}
              </span>
            </div>
            <span className="fw-medium">Select Exam Type</span>
            <div className="d-flex flex-column gap-3">
              {examTypes?.data
                ?.filter((t) => t.type !== "resit")
                .map((examType) => (
                  <Fragment key={examType.id}>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className={`card p-2 transition-all d-flex flex-column gap-3 pointer-cursor ${
                        String(moduleState?.examType?.id) ===
                        String(examType?.id)
                          ? "shadow-fern-100-lg border-fern-300"
                          : "border-none border shadow-sm"
                      }`}
                      style={{ borderRadius: "0.8rem", gap: "2rem" }}
                      onClick={() => {
                        dispatch(
                          setCreateExamValue({
                            value: examType,
                            field: "examType",
                          }),
                        );
                      }}
                    >
                      <div className="d-flex flex-row align-items-center justify-content-between">
                        <div className="d-flex flex-row align-items-center gap-2">
                          <div
                            className="d-flex flex-row align-items-center justify-content-center font-size-md fw-semibold gap-2 rounded-3 primary-background-100 color-primary"
                            style={{ height: "2.5rem", width: "2.5rem" }}
                          >
                            <BookOpenCheck size={16} />
                          </div>
                          <div className="d-flex flex-column">
                            <span className="fw-semibold">
                              {drawerData?.exam_name}
                            </span>
                            <div className="d-flex flex-row align-items-center gap-1 text-capitalize">
                              <span>{drawerData?.specialty_name}</span>
                              <Dot size={16} />
                              <span>{drawerData?.level_name}</span>
                              <Dot size={16} />
                              <span>{drawerData?.max_score}</span>
                              <Dot size={16} />
                              <span>{drawerData?.school_year}</span>
                            </div>
                          </div>
                        </div>
                        <AnimatePresence>
                          {String(moduleState?.examType?.id) ===
                            String(examType.id) && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 30,
                              }}
                            >
                              <CircleCheck size={16} className="green-color" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <p className="text-muted font-light">
                        {examType?.description}
                      </p>
                    </motion.div>
                  </Fragment>
                ))}
            </div>
          </div>
        )}
      </div>
      <div className="drawer-footer font-size-sm">
        <div className="d-flex flex-column w-100">
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
          <div className="d-flex flex-row align-items-center justify-content-between p-2">
            <button
              className="border-none bg-none p-2"
              onClick={() => {
                handleClose();
                dispatch(resetCreateExamState());
              }}
            >
              cancel
            </button>
            {moduleState?.examType && (
              <button
                className="rouned primary-background text-white border-none px-3 py-2 rounded-3"
                onClick={() => nextStep()}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SelectExamType;

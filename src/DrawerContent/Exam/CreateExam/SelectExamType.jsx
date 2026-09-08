import { useGetExamTypes } from "../../../ModalContent/ExamType/useGetExamType";
import { useDispatch, useSelector } from "react-redux";
import RectangleSkeleton from "../../../components/SkeletonPageLoader/RectangularSkeleton";
import { Dot,  CircleCheck, X, BookOpenCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NotFoundError } from "../../../components/errors/Error";
import HorizontalDashedLine from "../../../components/DashedLine/HorizonetalDashedLine";
import { Fragment } from "react";
import { setCreateExamValue } from "../../../Slices/exam/examSlice";
function SelectExamType({
  handleClose,
  nextStep,
  fullStep,
  currentStep
}) {
  const dispatch = useDispatch();
  const { data: examTypes, isLoading, error } = useGetExamTypes();
  const moduleState = useSelector((state) => state.exam.createExam);
  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between border-bottom p-2 font-size-sm">
        <span className="fw-medium">Create Exam</span>
        <button
          className="bg-none border-none border rounded-circle"
          aria-label="Close drawer"
          onClick={() => {
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
        {isLoading ? (
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
            ></NotFoundError>
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
              {examTypes?.data?.map((examType) => (
                <Fragment key={examType.id}>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className={`card p-2 transition-all
                   d-flex flex-column gap-3 pointer-cursor 
                  ${
                    moduleState?.examType?.id == examType?.id
                      ? "shadow-fern-100-lg border-fern-300"
                      : "border-none border shadow-sm"
                  } `}
                    style={{ borderRadius: "0.8rem", gap: "2rem" }}
                    onClick={() => {
                      dispatch(
                        setCreateExamValue({
                          value: examType,
                          field: "examType"
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
                            {examType.exam_name}
                          </span>
                          <div className="d-flex flex-row align-items-center gap-1 text-capitalize">
                            <small className="text-muted">
                              {examType.semester} Semester
                            </small>
                            <Dot size={16} />
                            <small className="text-muted">
                              {examType.type}
                            </small>
                          </div>
                        </div>
                      </div>
                      <AnimatePresence>
                        {moduleState?.examType?.id == examType.id && (
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
              onClick={() => handleClose()}
            >
              cancel
            </button>
            {moduleState.examType && (
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

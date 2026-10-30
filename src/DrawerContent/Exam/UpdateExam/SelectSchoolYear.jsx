import { useDispatch, useSelector } from "react-redux";
import {
  Dot,
  X,
  BookOpenCheck,
  Calendar,
  CircleCheck,
  ArrowRight,
} from "lucide-react";
import HorizontalDashedLine from "../../../components/DashedLine/HorizonetalDashedLine";
import { Fragment, useState } from "react";
import FormErrorBanner from "../../../components/errors/FormErrorBanner";
import {
  setCreateExamValue,
  resetCreateExamState,
} from "../../../Slices/exam/examSlice";
import { useGetSchoolAcademicYears } from "../../../hooks/academicYear/useGetSchoolAcademicYears";
import SearchInput from "../../../components/input/search";
import { motion, AnimatePresence } from "framer-motion";
import { NotFoundError } from "../../../components/errors/Error";
import RectangleSkeleton from "../../../components/SkeletonPageLoader/RectangularSkeleton";
import { format, parseISO } from "date-fns";
import { getTimeRemaining } from "../../../utils/time/date";

const formatDate = (date) =>
  date ? format(parseISO(date), "MMM d, yyyy") : "N/A";
function SelectSchoolYear({
  handleClose,
  nextStep,
  previousStep,
  fullStep,
  currentStep,
  drawerData,
}) {
  const dispatch = useDispatch();
  const moduleState = useSelector((state) => state.exam.createExam);
  const { data: academicYears, isLoading, error } = useGetSchoolAcademicYears();
  const [stepError, setStepError] = useState(null);

  const handleSelect = (academicYear) => {
    setStepError(null);
    dispatch(
      setCreateExamValue({ value: academicYear, field: "academicYear" }),
    );
  };

  const handleNext = () => {
    if (!moduleState?.academicYear?.id) {
      setStepError({
        title: "No academic year selected.",
        messages: ["Please select an academic year to continue."],
      });
      return;
    }
    nextStep();
  };

  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between border-bottom p-2 font-size-sm">
        <span className="fw-medium">Update Exam</span>
        <button
          className="bg-none border-none border rounded-circle"
          aria-label="Close drawer"
          onClick={() => {
            handleClose();
            dispatch(resetCreateExamState());
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
        <FormErrorBanner
          error={stepError}
          onDismiss={() => setStepError(null)}
        />
        <div className="d-flex flex-column gap-4">
          <div className="d-flex flex-row align-items-center justify-content-between">
            <div className="d-flex flex-row align-items-center gap-2">
              <div
                className="d-flex flex-row align-items-center justify-content-center font-size-md fw-semibold gap-2 rounded-3 primary-background-100 color-primary"
                style={{ height: "2.5rem", width: "2.5rem" }}
              >
                <BookOpenCheck size={16} />
              </div>
              <div className="d-flex flex-column">
                <span className="fw-semibold">{drawerData?.exam_name}</span>
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
            <span className="text-end fw-medium text-capitalize">
              {`step ${currentStep} of ${fullStep} completed`}
            </span>
          </div>
          <div className="d-flex flex-column gap-2">
            <div className="d-flex flex-column gap-1">
              <span className="fw-medium">Search Academic Year</span>
              <SearchInput
                placeholder={"Search Academic Year..............."}
              />
            </div>
            <div className="d-flex flex-column gap-2">
              <span className="fw-medium">Academic Years</span>
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
              ) : !academicYears?.data?.length ? (
                <div className="alert alert-warning font-size-sm m-0">
                  No academic years are available. Please create an academic
                  year first.
                </div>
              ) : (
                academicYears.data.map((academicYear) => (
                  <Fragment key={academicYear.id}>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className={`card p-2 transition-all
                   d-flex flex-column gap-3 pointer-cursor 
                  ${
                    moduleState?.academicYear?.id == academicYear?.id
                      ? "shadow-fern-100-lg border-fern-300"
                      : "border-none border shadow-sm"
                  } `}
                      style={{ borderRadius: "0.85rem" }}
                      onClick={() => handleSelect(academicYear)}
                    >
                      <div className="d-flex flex-row align-items-center justify-content-between">
                        <div className="d-flex flex-row align-items-center gap-2">
                          <div
                            className="d-flex flex-row align-items-center justify-content-center font-size-md fw-semibold gap-2 rounded-3 primary-background-50 color-primary"
                            style={{ height: "2.5rem", width: "2.5rem" }}
                          >
                            <Calendar size={16} />
                          </div>
                          <div className="d-flex flex-column">
                            <small className="text-uppercase text-muted">
                              Academic Year
                            </small>
                            <span className="font-size-md fw-semibold">
                              {academicYear?.school_year}
                            </span>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center gap-2">
                          {academicYear.status == "upcoming" ? (
                            <span
                              className="rounded-pill d-inline-flex align-items-center gap-1 border-0 fw-normal px-2 pointer-cursor primary-background-50 color-primary"
                              style={{
                                fontSize: "0.75rem",
                                height: "1.5rem",
                              }}
                            >
                              <span>Upcoming</span>
                            </span>
                          ) : academicYear.status == "active" ? (
                            <span
                              className="rounded-pill d-inline-flex align-items-center gap-1 border-0 fw-normal px-2 pointer-cursor bg-fern-50 text-fern-400"
                              style={{
                                fontSize: "0.75rem",
                                height: "1.5rem",
                              }}
                            >
                              <span>Active</span>
                            </span>
                          ) : (
                            <span
                              className="rounded-pill d-inline-flex align-items-center gap-1 border-0 fw-normal px-2 pointer-cursor"
                              style={{
                                background: "#fafafa",
                                color: "#a3a3a3",
                                fontSize: "0.75rem",
                                height: "1.5rem",
                              }}
                            >
                              <span>Completed</span>
                            </span>
                          )}
                          <AnimatePresence>
                            {moduleState?.academicYear?.id ==
                              academicYear?.id && (
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
                                <CircleCheck
                                  size={16}
                                  className="green-color"
                                />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                      <HorizontalDashedLine
                        dashed={false}
                        color="#ccc"
                        thickness={0.2}
                      />
                      <div className="d-flex flex-row align-items-center gap-2">
                        <div className="d-flex flex-column">
                          <span className="fw-medium font-size-sm">
                            {academicYear?.specialty_name}
                          </span>
                          <div className="d-flex flex-row align-items-center gap-1 font-size-sm">
                            <span>{academicYear?.level_name}</span>
                            <Dot size={12} />
                            <span>{academicYear?.level_number}</span>
                          </div>
                        </div>
                      </div>
                      <HorizontalDashedLine
                        dashed={false}
                        color="#ccc"
                        thickness={0.2}
                      />
                      <div className="d-flex flex-column">
                        <div className="d-flex flex-row gap-2 fw-medium">
                          <span>{formatDate(academicYear?.start_date)}</span>
                          <ArrowRight size={16} />
                          <span>{formatDate(academicYear?.end_date)}</span>
                        </div>
                        {academicYear.status == "upcoming" ? (
                          <span className="color-primary text-capitalize fw-medium">
                            starts in{" "}
                            {getTimeRemaining(academicYear?.start_date)}
                          </span>
                        ) : academicYear.status == "active" ? (
                          <span className="text-fern-500 text-capitalize fw-medium">
                            Ends {formatDate(academicYear?.end_date)}
                          </span>
                        ) : (
                          <span className="color-primary text-capitalize fw-medium">
                            Ended {formatDate(academicYear?.end_date)}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  </Fragment>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="drawer-footer font-size-sm">
        <div className="d-flex flex-column w-100">
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
          <div className="d-flex flex-row align-items-center justify-content-between p-2">
            <button
              type="button"
              className="border-none bg-none p-2"
              onClick={() => previousStep()}
            >
              Back (select exam type)
            </button>
            <button
              type="button"
              className="rouned primary-background text-white border-none px-3 py-2 rounded-3"
              onClick={handleNext}
              disabled={isLoading || !!error}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default SelectSchoolYear;

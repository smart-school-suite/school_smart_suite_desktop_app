import { useDispatch, useSelector } from "react-redux";
import RectangleSkeleton from "../../../components/SkeletonPageLoader/RectangularSkeleton";
import {
  Dot,
  Calendar,
  X,
  BookOpenCheck,
  FileText,
  ArrowRight,
  Target,
  Calculator,
} from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { NotFoundError } from "../../../components/errors/Error";
import HorizontalDashedLine from "../../../components/DashedLine/HorizonetalDashedLine";
import { useEffect, useState, useRef } from "react";
import {
  DateRangeInput,
  NumberInput,
} from "../../../components/FormComponents/InputComponents";
import {
  dateRangeValidationSchema,
  numberSchema,
} from "../../../ComponentConfig/YupValidationSchema";
import { allFieldsValid, parseServerError } from "../../../utils/functions";
import FormErrorBanner from "../../../components/errors/FormErrorBanner";
import { useGetRelatedCaExam } from "../../../hooks/exam/useGetRelatedCaExam";
import { format, parseISO } from "date-fns";
import { getDayWindow } from "../../../utils/time/date";
import { resetCreateExamState } from "../../../Slices/exam/examSlice";
import { SingleSpinner } from "../../../components/Spinners/Spinners";
import { useUpdateExam } from "../../../hooks/exam/useUpdateExam";

const formatDate = (date) =>
  date ? format(parseISO(date), "MMM d, yyyy") : "N/A";
function UpdateExam({
  handleClose,
  nextStep,
  previousStep,
  fullStep,
  currentStep,
  drawerData,
}) {
  const dispatch = useDispatch();
  const moduleState = useSelector((state) => state.exam.createExam);
  const dateRangeRef = useRef();
  const maxScoreRef = useRef();
  const errorBannerRef = useRef(null);
  const { mutate: updateExam, isPending } = useUpdateExam(
    handleClose,
    drawerData?.id,
  );
  const [initialData] = useState(() => ({
    start_date: drawerData?.start_date || "",
    end_date: drawerData?.end_date || "",
    max_score: drawerData?.max_score || "",
  }));
  const [formData, setFormData] = useState(initialData);
  const [isInvalid, setIsInvalid] = useState({
    start_date: "",
    end_date: "",
    max_score: "",
  });
  const [clientError, setClientError] = useState(null);
  const [serverError, setServerError] = useState(null);

  const examType = moduleState?.examType?.type;
  const isSemesterExam = examType == "exam";
  const relatedCaQuery = useGetRelatedCaExam(
    moduleState?.academicYear?.id,
    moduleState?.examType?.id,
    { enabled: isSemesterExam },
  );

  useEffect(() => {
    if ((clientError || serverError) && errorBannerRef.current) {
      errorBannerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [clientError, serverError]);

  const clearBannerErrors = () => {
    setClientError(null);
    setServerError(null);
  };

  const handleStateChange = (field, value, stateFn) => {
    if (stateFn === setFormData) clearBannerErrors();
    stateFn((prev) => ({ ...prev, [field]: value }));
  };

  const changedFields = Object.keys(formData).filter(
    (field) => String(formData[field]) !== String(initialData[field]),
  );
  const datesChanged =
    changedFields.includes("start_date") || changedFields.includes("end_date");

  // Only validate what changed, so an exam whose dates are already in the past can still be edited
  const handlePrevalidation = async () => {
    const results = {};
    if (datesChanged && dateRangeRef.current) {
      results.startDate = await dateRangeRef.current.preValidateStart();
      results.endDate = await dateRangeRef.current.preValidateEnd();
    }
    if (changedFields.includes("max_score") && maxScoreRef.current) {
      results.maxScore = await maxScoreRef.current.triggerValidation();
    }
    return results;
  };

  const handleSubmit = async () => {
    clearBannerErrors();

    if (!moduleState?.examType?.id || !moduleState?.academicYear?.id) {
      setClientError({
        title: "Missing selection.",
        messages: [
          "Please go back and select both an exam type and an academic year.",
        ],
      });
      return;
    }

    if (isSemesterExam && !relatedCaQuery.data?.data) {
      setClientError({
        title: "No related Continuous Assessment (CA) found.",
        messages: [
          "A semester exam needs a CA exam for the same semester and academic year.",
        ],
      });
      return;
    }

    const prevalidation = await handlePrevalidation();
    if (!allFieldsValid(prevalidation)) {
      setClientError({
        title: "Please correct the highlighted fields before updating the exam.",
        messages: [],
      });
      return;
    }

    const payload = {
      ...Object.fromEntries(
        changedFields.map((field) => [field, formData[field]]),
      ),
      school_year_id: moduleState.academicYear.id,
      exam_type_id: moduleState.examType.id,
    };

    updateExam(
      { examId: drawerData?.id, updateData: payload },
      {
        onError: (error) =>
          setServerError(parseServerError(error, "Failed To Update Exam")),
      },
    );
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
          ref={errorBannerRef}
          error={clientError || serverError}
          onDismiss={clearBannerErrors}
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
          {examType == "ca" ? (
            <CreateCAExam
              handleStateChange={handleStateChange}
              formData={formData}
              setFormData={setFormData}
              setIsInvalid={setIsInvalid}
              dateRangeRef={dateRangeRef}
              maxScoreRef={maxScoreRef}
            />
          ) : isSemesterExam ? (
            <CreateSemesterExam
              handleStateChange={handleStateChange}
              formData={formData}
              setFormData={setFormData}
              setIsInvalid={setIsInvalid}
              dateRangeRef={dateRangeRef}
              maxScoreRef={maxScoreRef}
              relatedCaQuery={relatedCaQuery}
            />
          ) : null}
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
              disabled={isPending}
            >
              Back (select School Year)
            </button>
            <button
              type="button"
              className="rouned primary-background text-white border-none px-3 py-2 rounded-3"
              onClick={handleSubmit}
              disabled={
                isPending ||
                (isSemesterExam &&
                  (relatedCaQuery.isLoading || !!relatedCaQuery.error))
              }
            >
              {isPending ? <SingleSpinner /> : "Update Exam"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default UpdateExam;

function CreateCAExam({
  handleStateChange,
  setFormData,
  setIsInvalid,
  formData,
  dateRangeRef,
  maxScoreRef,
}) {
  return (
    <>
      <div>
        <DateRangeInput
          validationSchema={dateRangeValidationSchema({
            futureOnly: true,
            optional: true,
          })}
          onStartDateChange={(value) =>
            handleStateChange("start_date", value, setFormData)
          }
          onEndDateChange={(value) =>
            handleStateChange("end_date", value, setFormData)
          }
          onStartDateValidationChange={(value) =>
            handleStateChange("start_date", value, setIsInvalid)
          }
          onEndDateValidationChange={(value) =>
            handleStateChange("end_date", value, setIsInvalid)
          }
          startValue={formData.start_date}
          endValue={formData.end_date}
          ref={dateRangeRef}
        />
      </div>
      <div>
        <label htmlFor="maxScore" className="font-size-sm">
          Exam Score
        </label>
        <NumberInput
          onChange={(value) =>
            handleStateChange("max_score", value, setFormData)
          }
          onValidationChange={(value) =>
            handleStateChange("max_score", value, setIsInvalid)
          }
          validationSchema={numberSchema({
            min: 1,
            max: 500,
            optional: true,
            integerOnly: false,
            messages: {
              min: "Exam Score Must Be Atleast 1",
              max: "Exam Score Must Not Exceed 500",
            },
          })}
          value={formData.max_score}
          ref={maxScoreRef}
        />
      </div>
    </>
  );
}

function CreateSemesterExam({
  handleStateChange,
  setFormData,
  setIsInvalid,
  formData,
  dateRangeRef,
  maxScoreRef,
  relatedCaQuery,
}) {
  const { data: relatedCa, isLoading, error } = relatedCaQuery;
  return isLoading ? (
    <div className="d-flex flex-column gap-2">
      <RectangleSkeleton height="20dvh" width="100%" />
      <div className="d-flex flex-column gap-1">
        <RectangleSkeleton height="2dvh" width="10%" />
        <RectangleSkeleton height="10dvh" width="100%" />
      </div>
      <div className="d-flex flex-column gap-1">
        <RectangleSkeleton height="2dvh" width="10%" />
        <RectangleSkeleton height="10dvh" width="100%" />
      </div>
      <div className="d-flex flex-column gap-1">
        <RectangleSkeleton height="2dvh" width="10%" />
        <RectangleSkeleton height="10dvh" width="100%" />
      </div>
      <div className="d-flex flex-column gap-1">
        <RectangleSkeleton height="2dvh" width="10%" />
        <RectangleSkeleton height="10dvh" width="100%" />
      </div>
    </div>
  ) : error ? (
    <NotFoundError
      title={error?.response?.data?.errors?.title}
      description={error?.response?.data?.errors?.description}
    ></NotFoundError>
  ) : (
    <>
      <div className="d-flex flex-column gap-2">
        <div className="d-flex flex-column gap-1">
          <span className="fw-medium ">Related Continuous Assessment (CA)</span>
          <div className="card p-2 border border-none rounded-4 d-flex flex-column gap-3 shadow-sm">
            <div className="d-flex flex-row align-items-center gap-2">
              <div
                className="d-flex flex-row align-items-center justify-content-center font-size-md fw-semibold gap-2 rounded-3 primary-background-50 color-primary"
                style={{ height: "2.5rem", width: "2.5rem" }}
              >
                <FileText size={16} />
              </div>
              <div className="d-flex flex-column">
                <small className="text-uppercase text-muted">
                  {relatedCa?.data?.exam_type?.semester} Semester
                </small>
                <span className="font-size-sm fw-semibold">
                  {relatedCa?.data?.exam_type?.exam_name}
                </span>
              </div>
            </div>
            <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.2} />
            <div className="d-flex flex-row gap-4">
              <div className="d-flex flex-column gap-1">
                <small className="text-muted">MAX SCORE</small>
                <div className="d-flex flex-row align-items-baseline gap-2">
                  <div className="d-flex flex-row align-items-baseline gap-2">
                    <Target size={12} style={{ color: "#ccc" }} />
                    <span className="fw-semibold font-size-md">
                      {relatedCa?.data?.max_score}
                    </span>
                  </div>
                  <small style={{ color: "#ccc" }}>Pts</small>
                </div>
              </div>
              <div className="d-flex flex-column gap-1">
                <small className="text-muted">WINDOW</small>
                <span className="fw-semibold font-size-md">
                  {getDayWindow(
                    relatedCa?.data?.start_date,
                    relatedCa?.data?.end_date,
                  )}
                </span>
              </div>
            </div>
            <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.2} />
            <div>
              <div className="d-flex flex-row align-items-center gap-2 fw-medium">
                <Calendar size={16} style={{ color: "#ccc" }} />
                <span>{formatDate(relatedCa?.data?.start_date)}</span>
                <ArrowRight size={16} style={{ color: "#ccc" }} />
                <span>{formatDate(relatedCa?.data?.end_date)}</span>
              </div>
            </div>
          </div>
        </div>
        <DateRangeInput
          validationSchema={dateRangeValidationSchema({
            futureOnly: true,
            optional: true,
          })}
          onStartDateChange={(value) =>
            handleStateChange("start_date", value, setFormData)
          }
          onEndDateChange={(value) =>
            handleStateChange("end_date", value, setFormData)
          }
          onStartDateValidationChange={(value) =>
            handleStateChange("start_date", value, setIsInvalid)
          }
          onEndDateValidationChange={(value) =>
            handleStateChange("end_date", value, setIsInvalid)
          }
          startValue={formData.start_date}
          endValue={formData.end_date}
          ref={dateRangeRef}
        />
        <div>
          <label htmlFor="maxScore" className="font-size-sm">
            Exam Score
          </label>
          <NumberInput
            onChange={(value) =>
              handleStateChange("max_score", value, setFormData)
            }
            onValidationChange={(value) =>
              handleStateChange("max_score", value, setIsInvalid)
            }
            validationSchema={numberSchema({
              min: 1,
              max: 500,
              optional: true,
              integerOnly: false,
              messages: {
                min: "Exam Max Score Must Be Atleast 1",
                max: "Exam Max Score Must Not Exceed 500",
              },
            })}
            value={formData.max_score}
            ref={maxScoreRef}
          />
        </div>
        {formData.max_score && (
          <AnimatePresence>
            <div className="d-flex flex-column gap-3">
              <div className="d-flex flex-row align-items-center gap-2 fw-medium">
                <Calculator size={16} />
                <span>Exam Score Calculation</span>
              </div>
              <div className="d-flex flex-column gap-3">
                <div className="d-flex flex-row justify-content-between">
                  <div className="d-flex flex-row align-items-center gap-2">
                    <div
                      style={{
                        width: "0.65rem",
                        height: "0.65rem",
                        borderRadius: "1rem",
                      }}
                      className="primary-background-200"
                    ></div>
                    <span>CA Maximum</span>
                  </div>
                  <span className="fw-semibold font-size-sm">
                    {relatedCa?.data?.max_score}
                  </span>
                </div>
                <div className="d-flex flex-row justify-content-between">
                  <div className="d-flex flex-row align-items-center gap-2">
                    <div
                      style={{
                        width: "0.65rem",
                        height: "0.65rem",
                        borderRadius: "1rem",
                      }}
                      className="primary-background-400"
                    ></div>
                    <span>Exam Maximum</span>
                  </div>
                  <span className="fw-semibold font-size-sm">
                    {formData?.max_score}
                  </span>
                </div>
              </div>
              <HorizontalDashedLine
                dashed={false}
                color="#ccc"
                thickness={0.2}
              />
              <div className="d-flex flex-row align-items-center justify-content-between">
                <span className="fw-semibold">Final Exam Score</span>
                <div className="d-flex flex-row align-items-baseline gap-1">
                  <span className="font-size-lg fw-bold">
                    {parseFloat(
                      parseFloat(formData?.max_score) +
                        parseFloat(relatedCa?.data?.max_score),
                    ).toFixed(2)}
                  </span>
                  <small style={{ color: "#ccc" }} className="font-size-sm">
                    Pts
                  </small>
                </div>
              </div>
              <div className="p-3 font-size-sm primary-background-100 rounded-3 primary-color-dark d-flex align-items-center">
                <ul className="mb-0">
                  <li>
                    When results are entered, the CA and exam scores will be
                    combined to produce a final exam score out of{" "}
                    {parseFloat(
                      parseFloat(formData?.max_score) +
                        parseFloat(relatedCa?.data?.max_score),
                    ).toFixed(2)}
                    .
                  </li>
                  <li>
                    The exam’s {parseFloat(formData?.max_score)} points will be
                    combined with the selected CA’s
                    {relatedCa?.data?.max_score} points when the exam is
                    created, for a total of{" "}
                    {parseFloat(
                      parseFloat(formData?.max_score) +
                        parseFloat(relatedCa?.data?.max_score),
                    ).toFixed(2)}
                    points.
                  </li>
                </ul>
              </div>
            </div>
          </AnimatePresence>
        )}
      </div>
    </>
  );
}

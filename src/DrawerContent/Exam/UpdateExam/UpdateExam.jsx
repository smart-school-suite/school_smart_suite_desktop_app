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
import { useEffect, useState } from "react";
import {
  DateRangeInput,
  NumberInput,
} from "../../../components/FormComponents/InputComponents";
import {
  dateRangeValidationSchema,
  numberSchema,
} from "../../../ComponentConfig/YupValidationSchema";
import { useGetRelatedCaExam } from "../../../hooks/exam/useGetRelatedCaExam";
import { format, parseISO } from "date-fns";
import { getDayWindow } from "../../../utils/time/date";
import { resetCreateExamState } from "../../../Slices/exam/examSlice";
import { SingleSpinner } from "../../../components/Spinners/Spinners";
import { useUpdateExam } from "../../../hooks/exam/useUpdateExam";
import { useGetExamDetails } from "../../../hooks/exam/useGetExamDetails";
import FormErrorBanner from "../../../components/errors/FormErrorBanner";
import { useFormError } from "../../../hooks/form/useFormError";
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
  const { data: examDetails } = useGetExamDetails(drawerData?.id);
  const handleUpdated = () => {
    dispatch(resetCreateExamState());
    handleClose?.();
  };
  const { mutate: updateExam, isPending } = useUpdateExam(
    handleUpdated,
    drawerData?.id,
  );
  // The selection only differs from the saved exam if the user picked a new
  // exam type / school year in the previous steps.
  const originalExamTypeId = examDetails?.data?.exam_type_id;
  const originalSchoolYearId = examDetails?.data?.school_year_id;
  const selectionUnchanged =
    !!originalExamTypeId &&
    moduleState?.examType?.id === originalExamTypeId &&
    moduleState?.academicYear?.id === originalSchoolYearId;
  const { formError, errorBannerRef, setClientError, handleServerError, clearFormError } =
    useFormError("Failed To Update Exam");
  const [formData, setFormData] = useState({
    start_date: toDateInputValue(drawerData?.start_date),
    end_date: toDateInputValue(drawerData?.end_date),
    // A CA's stored max score is exactly what the user entered. A semester
    // exam's stored max score already includes its CA, so its own portion is
    // filled in once the related CA has loaded (see CreateSemesterExam).
    max_score:
      drawerData?.exam_type === "ca" ? (drawerData?.max_score ?? "") : "",
  });
  const [maxScoreTouched, setMaxScoreTouched] = useState(false);
  const [isInvalid, setIsInvalid] = useState({
    start_date: "",
    end_date: "",
    max_score: "",
  });
  const handleStateChange = (field, value, stateFn) => {
    if (stateFn === setFormData) {
      clearFormError();
      if (field === "max_score") setMaxScoreTouched(true);
    }
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const handleSubmit = async () => {
    if (Object.values(isInvalid).some((value) => value === false)) {
      setClientError(
        "Invalid Fields",
        "Some Fields Seem To Be Invalid Please Go Through the form and try again",
      );
      return;
    }
    const payload = {
      start_date: formData.start_date || null,
      end_date: formData.end_date || null,
      school_year_id: moduleState?.academicYear?.id,
      exam_type_id: moduleState?.examType?.id,
    };
    // Only send the score when the user changed it; the API otherwise keeps
    // the exam's current score (re-combined with the CA if the CA changes).
    if (maxScoreTouched && formData.max_score !== "") {
      payload.max_score = formData.max_score;
    }
    clearFormError();
    updateExam({
      examId: drawerData?.id,
      updateData: payload,
    }, { onError: handleServerError });
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
          error={formError}
          onDismiss={clearFormError}
          className="mb-2"
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
          {moduleState?.examType?.type == "ca" ? (
            <CreateCAExam
              handleStateChange={handleStateChange}
              formData={formData}
              isInvalid={isInvalid}
              setFormData={setFormData}
              setIsInvalid={setIsInvalid}
              moduleState={moduleState}
            />
          ) : moduleState?.examType?.type == "exam" ? (
            <CreateSemesterExam
              handleStateChange={handleStateChange}
              formData={formData}
              isInvalid={isInvalid}
              setFormData={setFormData}
              setIsInvalid={setIsInvalid}
              moduleState={moduleState}
              originalMaxScore={drawerData?.max_score}
              selectionUnchanged={selectionUnchanged}
              maxScoreTouched={maxScoreTouched}
            />
          ) : null}
        </div>
      </div>
      <div className="drawer-footer font-size-sm">
        <div className="d-flex flex-column w-100">
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
          <div className="d-flex flex-row align-items-center justify-content-between p-2">
            <button
              className="border-none bg-none p-2"
              onClick={() => previousStep()}
            >
              Back (select School Year)
            </button>
            <button
              className="rouned primary-background text-white border-none px-3 py-2 rounded-3"
              disabled={isPending}
              onClick={() => handleSubmit()}
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
}) {
  return (
    <>
      <div>
        <DateRangeInput
          validationSchema={dateRangeValidationSchema({
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
  moduleState,
  originalMaxScore,
  selectionUnchanged,
  maxScoreTouched,
}) {
  const {
    data: relatedCa,
    isLoading,
    error,
  } = useGetRelatedCaExam(
    moduleState?.academicYear?.id,
    moduleState?.examType?.id,
  );
  const relatedCaMaxScore = relatedCa?.data?.max_score;
  useEffect(() => {
    // Show the exam's own portion (stored total minus its CA). Only possible
    // when the CA shown is the one the exam is currently combined with.
    if (
      maxScoreTouched ||
      !selectionUnchanged ||
      relatedCaMaxScore == null ||
      originalMaxScore == null
    ) {
      return;
    }
    const portion =
      parseFloat(originalMaxScore) - parseFloat(relatedCaMaxScore);
    setFormData((prev) => ({
      ...prev,
      max_score: Number.isFinite(portion)
        ? String(parseFloat(portion.toFixed(2)))
        : prev.max_score,
    }));
  }, [
    relatedCaMaxScore,
    originalMaxScore,
    selectionUnchanged,
    maxScoreTouched,
    setFormData,
  ]);
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
                <span>
                  {format(parseISO(relatedCa?.data?.start_date), "MMM d, yyyy")}
                </span>
                <ArrowRight size={16} style={{ color: "#ccc" }} />
                <span>
                  {format(parseISO(relatedCa?.data?.end_date), "MMM d, yyyy")}
                </span>
              </div>
            </div>
          </div>
        </div>
        <DateRangeInput
          validationSchema={dateRangeValidationSchema({
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

function toDateInputValue(value) {
  if (!value) return "";
  const text = String(value);
  // The API returns plain calendar dates (YYYY-MM-DD), which the inputs expect as-is.
  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) return text;
  // A full timestamp (e.g. "2027-01-04T23:00:00.000000Z") is converted to the local
  // calendar day; slicing the UTC string would land on the previous day for UTC+ zones.
  const parsed = parseISO(text);
  return Number.isNaN(parsed.getTime()) ? "" : format(parsed, "yyyy-MM-dd");
}

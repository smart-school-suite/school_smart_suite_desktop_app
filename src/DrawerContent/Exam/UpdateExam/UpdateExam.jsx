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
  Lock,
  Info,
} from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { NotFoundError } from "../../../components/errors/Error";
import HorizontalDashedLine from "../../../components/DashedLine/HorizonetalDashedLine";
import { useState } from "react";
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
  const {
    formError,
    errorBannerRef,
    setClientError,
    handleServerError,
    clearFormError,
  } = useFormError("Failed To Update Exam");
  // Inputs start empty: the current values are shown read-only and the user
  // only fills in what they want to change. Seeding the inputs made exams that
  // had already started fail date validation on submit.
  const [formData, setFormData] = useState({
    start_date: "",
    end_date: "",
    max_score: "",
  });
  const [isInvalid, setIsInvalid] = useState({
    start_date: "",
    end_date: "",
    max_score: "",
  });
  const currentValues = {
    startDate: toDateInputValue(drawerData?.start_date),
    endDate: toDateInputValue(drawerData?.end_date),
    maxScore: drawerData?.max_score,
  };
  // The API refuses max score / grade scale changes once candidates are evaluated.
  const scoreLocked = !!examDetails?.data?.has_evaluated_candidates;
  const hasGradeScale = !!drawerData?.is_grade_scale_configured;
  const handleStateChange = (field, value, stateFn) => {
    if (stateFn === setFormData) clearFormError();
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
    // Only send what the user entered; the API keeps the current values for the rest
    // (and re-combines a semester exam's score with its CA if the CA changes).
    const payload = {
      school_year_id: moduleState?.academicYear?.id,
      exam_type_id: moduleState?.examType?.id,
    };
    if (formData.start_date) payload.start_date = formData.start_date;
    if (formData.end_date) payload.end_date = formData.end_date;
    if (
      !scoreLocked &&
      formData.max_score !== "" &&
      formData.max_score != null
    ) {
      payload.max_score = formData.max_score;
    }
    clearFormError();
    updateExam(
      {
        examId: drawerData?.id,
        updateData: payload,
      },
      { onError: handleServerError },
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
          <CurrentValuesCard
            currentValues={currentValues}
            isCaExam={moduleState?.examType?.type == "ca"}
          />
          {moduleState?.examType?.type == "ca" ? (
            <CreateCAExam
              handleStateChange={handleStateChange}
              formData={formData}
              isInvalid={isInvalid}
              setFormData={setFormData}
              setIsInvalid={setIsInvalid}
              moduleState={moduleState}
              scoreLocked={scoreLocked}
              hasGradeScale={hasGradeScale}
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
              scoreLocked={scoreLocked}
              hasGradeScale={hasGradeScale}
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
  scoreLocked,
  hasGradeScale,
}) {
  return (
    <>
      <div>
        <DateRangeInput
          validationSchema={dateRangeValidationSchema({
            optional: true,
            futureOnly: true,
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
      {scoreLocked ? (
        <ScoreLockedNotice />
      ) : (
        <div>
          <label htmlFor="maxScore" className="font-size-sm">
            New Exam Score <span className="text-muted">(optional)</span>
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
            placeholder={"Leave blank to keep the current score"}
            value={formData.max_score}
          />
          {hasGradeScale && formData.max_score !== "" && <GradeScaleNotice />}
        </div>
      )}
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
  scoreLocked,
  hasGradeScale,
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
  // The stored total includes the CA; its own portion is only knowable when the
  // CA shown is the one the exam is currently combined with.
  const currentPortion =
    selectionUnchanged && relatedCaMaxScore != null && originalMaxScore != null
      ? parseFloat(
          (
            parseFloat(originalMaxScore) - parseFloat(relatedCaMaxScore)
          ).toFixed(2),
        )
      : null;
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
            futureOnly: true,
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
        {scoreLocked ? (
          <ScoreLockedNotice />
        ) : (
          <div>
            <label htmlFor="maxScore" className="font-size-sm">
              New Exam Score <span className="text-muted">(optional)</span>
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
              placeholder={"Leave blank to keep the current score"}
              value={formData.max_score}
            />
            {currentPortion != null && (
              <small className="text-muted">
                Current exam score (excluding CA): {currentPortion}
              </small>
            )}
            {hasGradeScale && formData.max_score !== "" && <GradeScaleNotice />}
          </div>
        )}
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

function CurrentValuesCard({ currentValues, isCaExam }) {
  const formatDate = (value) =>
    value ? format(parseISO(value), "MMM d, yyyy") : "Not set";
  return (
    <div className="d-flex flex-column gap-1">
      <span className="fw-medium">Current Values</span>
      <div className="card p-2 border border-none rounded-4 d-flex flex-row flex-wrap gap-4 shadow-sm">
        <div className="d-flex flex-column gap-1">
          <small className="text-muted">START DATE</small>
          <span className="fw-semibold">
            {formatDate(currentValues.startDate)}
          </span>
        </div>
        <div className="d-flex flex-column gap-1">
          <small className="text-muted">END DATE</small>
          <span className="fw-semibold">
            {formatDate(currentValues.endDate)}
          </span>
        </div>
        <div className="d-flex flex-column gap-1">
          <small className="text-muted">
            {isCaExam ? "MAX SCORE" : "MAX SCORE (INCL. CA)"}
          </small>
          <span className="fw-semibold">
            {currentValues.maxScore ?? "Not set"}
          </span>
        </div>
      </div>
      <small className="text-muted">
        Fill in only the fields you want to change. Empty fields keep their
        current values.
      </small>
    </div>
  );
}

function ScoreLockedNotice() {
  return (
    <div className="p-3 font-size-sm rounded-3 d-flex flex-row gap-2 align-items-start border">
      <Lock size={16} className="flex-shrink-0 mt-1" />
      <span>
        The exam score can no longer be changed because candidates have already
        been evaluated for this exam. You can still update the exam dates.
      </span>
    </div>
  );
}

function GradeScaleNotice() {
  return (
    <div className="mt-2 p-2 font-size-sm rounded-3 primary-background-100 d-flex flex-row gap-2 align-items-start">
      <Info size={16} className="flex-shrink-0 mt-1" />
      <span>
        This exam has a grade scale. If the new max score no longer matches the
        grade scale's max score, the grade scale will be removed and you will
        need to configure a new one.
      </span>
    </div>
  );
}

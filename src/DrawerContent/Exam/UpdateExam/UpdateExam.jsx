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
import { useState, useRef } from "react";
import toast from "react-hot-toast";
import {
  DateRangeInput,
  NumberInput,
} from "../../../components/FormComponents/InputComponents";
import {
  dateRangeValidationSchema,
  numberSchema,
} from "../../../ComponentConfig/YupValidationSchema";
import { allFieldsValid } from "../../../utils/functions";
import ToastWarning from "../../../components/Toast/ToastWarning";
import { useGetRelatedCaExam } from "../../../hooks/exam/useGetRelatedCaExam";
import { format, parseISO } from "date-fns";
import { getDayWindow } from "../../../utils/time/date";
import { resetCreateExamState } from "../../../Slices/exam/examSlice";
import { SingleSpinner } from "../../../components/Spinners/Spinners";
import { useUpdateExam } from "../../../hooks/exam/useUpdateExam";
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
  const { mutate: updateExam, isPending } = useUpdateExam(
    handleClose,
    drawerData.id,
  );
  const [formData, setFormData] = useState({
    start_date: drawerData?.start_date || "",
    end_date: drawerData?.end_date || "",
    max_score: drawerData?.max_score || "",
  });
  const [isInvalid, setIsInvalid] = useState({
    start_date: "",
    end_date: "",
    max_score: "",
  });
  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const handleSubmit = async () => {
    if (!allFieldsValid(isInvalid)) {
      toast.custom(
        <ToastWarning
          title={"Invalid Fields"}
          description={
            "Some Fields Seem To Be Invalid Please Go Through the form and try again"
          }
        />,
      );
      return;
    }
    const payload = {
      ...formData,
      school_year_id: moduleState.academicYear.id,
      exam_type_id: moduleState.examType.id,
    };
    update({
      examId: drawerData?.id,
      updateData: payload,
    });
  };
  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between border-bottom p-2 font-size-sm">
        <span className="fw-medium">Create Exam</span>
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
          {moduleState.examType.type == "ca" ? (
            <CreateCAExam
              handleStateChange={handleStateChange}
              formData={formData}
              isInvalid={isInvalid}
              setFormData={setFormData}
              setIsInvalid={setIsInvalid}
              moduleState={moduleState}
            />
          ) : (
            <CreateSemesterExam
              handleStateChange={handleStateChange}
              formData={formData}
              isInvalid={isInvalid}
              setFormData={setFormData}
              setIsInvalid={setIsInvalid}
              moduleState={moduleState}
            />
          )}
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
              max: "Exam Score Must Not Exceed 100",
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
}) {
  const {
    data: relatedCa,
    isLoading,
    error,
  } = useGetRelatedCaExam(
    moduleState?.academicYear?.id,
    moduleState?.examType?.id,
  );
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
                max: "Exam Max Score Must Not Exceed 100",
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

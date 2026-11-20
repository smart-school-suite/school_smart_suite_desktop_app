import { BookOpenCheck, Calculator, Dot, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { numberSchema } from "../../../ComponentConfig/YupValidationSchema";
import HorizontalDashedLine from "../../../components/DashedLine/HorizonetalDashedLine";
import FormErrorBanner from "../../../components/errors/FormErrorBanner";
import { NumberInput } from "../../../components/FormComponents/InputComponents";
import { SingleSpinner } from "../../../components/Spinners/Spinners";
import RuleDateField from "../../../components/UpdateRules/RuleDateField";
import { useCreateExam } from "../../../hooks/exam/useCreateExam";
import { useFormError } from "../../../hooks/form/useFormError";
import { resetCreateExamState } from "../../../Slices/exam/examSlice";
import { boundsFor, dateError } from "../../../utils/updateRules/dateRules";
import { SelectedSemester } from "./SelectExamType";

const TYPE_LABEL = { ca: "Continuous Assessment", exam: "Semester Exam" };

const scoreSchema = numberSchema({
  min: 1,
  max: 500,
  required: true,
  integerOnly: false,
  messages: {
    required: "Exam Score Required",
    min: "Exam Mark Must Be Atleast 1",
    max: "Exam Mark Must Not Exceed 500",
  },
});

const round = (value) => Math.round(Number(value) * 100) / 100;

/** How a semester exam's max score adds up: the CA's plus the exam's own part. */
function ScoreCalculation({ caMax, examMax }) {
  const total = round(Number(caMax) + Number(examMax));
  return (
    <div className="d-flex flex-column gap-2">
      <div className="d-flex flex-row align-items-center gap-2 fw-medium">
        <Calculator size={16} />
        <span>Exam score calculation</span>
      </div>
      {[
        ["CA maximum", caMax, "primary-background-200"],
        ["Exam maximum", examMax, "primary-background-400"],
      ].map(([label, value, tone]) => (
        <div key={label} className="d-flex flex-row justify-content-between">
          <div className="d-flex flex-row align-items-center gap-2">
            <span className={`rounded-circle ${tone}`} style={{ width: "0.65rem", height: "0.65rem" }} />
            <span>{label}</span>
          </div>
          <span className="fw-semibold">{value}</span>
        </div>
      ))}
      <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.2} />
      <div className="d-flex flex-row align-items-center justify-content-between">
        <span className="fw-semibold">Final exam score</span>
        <span className="font-size-lg fw-bold">
          {total.toFixed(2)} <small className="text-iron-400 font-size-sm fw-normal">pts</small>
        </span>
      </div>
      <span className="font-size-xs text-iron-500">
        When results are entered, each student's CA and exam scores are added together, out of {total.toFixed(2)}.
      </span>
    </div>
  );
}

function CreateExam({ handleClose, previousStep, fullStep, currentStep }) {
  const dispatch = useDispatch();
  const moduleState = useSelector((state) => state.exam.createExam);
  const semester = moduleState?.schoolSemester;
  const examType = moduleState?.examType;
  const isSemesterExam = examType?.type === "exam";
  const fields = semester?.fields ?? {};

  const [form, setForm] = useState({ start_date: "", end_date: "", max_score: "" });
  const [scoreValid, setScoreValid] = useState(false);
  const { mutate: createExam, isPending } = useCreateExam(handleClose);
  const { formError, errorBannerRef, handleServerError, setClientError, clearFormError } =
    useFormError("Failed To Create Exam");

  const startBounds = useMemo(
    () => boundsFor("start_date", fields.start_date, { start: form.start_date, end: form.end_date, sameDay: true }),
    [fields.start_date, form.start_date, form.end_date],
  );
  const endBounds = useMemo(
    () => boundsFor("end_date", fields.end_date, { start: form.start_date, end: form.end_date, sameDay: true }),
    [fields.end_date, form.start_date, form.end_date],
  );

  const set = (field, value) => {
    clearFormError();
    setForm((previous) => ({ ...previous, [field]: value }));
  };

  const close = () => {
    dispatch(resetCreateExamState());
    handleClose();
  };

  const handleSubmit = () => {
    clearFormError();
    if (!semester?.id || !examType?.id) {
      setClientError("Missing selection.", ["Go back and pick a semester and an exam type."]);
      return;
    }
    const problems = [
      dateError("start date", form.start_date, startBounds),
      dateError("end date", form.end_date, endBounds),
      !scoreValid ? "Enter a max score between 1 and 500." : null,
    ].filter(Boolean);
    if (problems.length > 0) {
      setClientError("Please correct these before creating the exam.", problems);
      return;
    }

    createExam(
      {
        school_semester_id: semester.id,
        exam_type_id: examType.id,
        start_date: form.start_date,
        end_date: form.end_date,
        max_score: form.max_score,
      },
      { onError: handleServerError },
    );
  };

  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between border-bottom p-2 font-size-sm">
        <span className="fw-medium">Create Exam</span>
        <button
          className="bg-none border-none border rounded-circle"
          aria-label="Close drawer"
          onClick={close}
          disabled={isPending}
          style={{ width: "2rem", height: "2rem", display: "grid", placeItems: "center", cursor: "pointer" }}
        >
          <X size={16} />
        </button>
      </div>
      <div className="drawer-content px-2 font-size-sm pt-2 pb-5">
        <FormErrorBanner ref={errorBannerRef} error={formError} onDismiss={clearFormError} />
        <div className="d-flex flex-column gap-3">
          <SelectedSemester semester={semester} currentStep={currentStep} fullStep={fullStep} />
          <div className="d-flex flex-row align-items-center gap-2">
            <div
              className="d-flex align-items-center justify-content-center rounded-3 primary-background-50 color-primary flex-shrink-0"
              style={{ height: "2.5rem", width: "2.5rem" }}
            >
              <BookOpenCheck size={16} />
            </div>
            <div className="d-flex flex-column">
              <small className="text-muted">Exam to create</small>
              <div className="d-flex flex-row align-items-center">
                <span className="fw-semibold">{examType?.name}</span>
                <Dot size={14} />
                <span className="text-iron-500">{TYPE_LABEL[examType?.type] ?? examType?.type}</span>
              </div>
            </div>
          </div>
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.2} />

          <RuleDateField
            id="exam-create-start"
            label="Start date"
            value={form.start_date}
            onChange={(value) => set("start_date", value)}
            bounds={startBounds}
            editable
          />
          <RuleDateField
            id="exam-create-end"
            label="End date"
            value={form.end_date}
            onChange={(value) => set("end_date", value)}
            bounds={endBounds}
            editable
          />
          <div className="d-flex flex-column gap-1">
            <label htmlFor="exam-create-score" className="font-size-sm m-0">
              {isSemesterExam ? "Exam score (without the CA)" : "Max score"}
            </label>
            <NumberInput
              id="exam-create-score"
              value={form.max_score}
              onChange={(value) => set("max_score", value ?? "")}
              onValidationChange={(valid) => setScoreValid(valid)}
              validationSchema={scoreSchema}
              step="0.01"
              placeholder={isSemesterExam ? "e.g 70" : "e.g 30"}
            />
          </div>
          {isSemesterExam && examType?.ca_max_score != null && Number(form.max_score) > 0 && (
            <ScoreCalculation caMax={examType.ca_max_score} examMax={round(form.max_score)} />
          )}
        </div>
      </div>
      <div className="drawer-footer font-size-sm">
        <div className="d-flex flex-column w-100">
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
          <div className="d-flex flex-row align-items-center justify-content-between p-2">
            <button type="button" className="border-none bg-none p-2" onClick={previousStep} disabled={isPending}>
              Back (select exam)
            </button>
            <button
              type="button"
              className="primary-background text-white border-none px-3 py-2 rounded-3"
              onClick={handleSubmit}
              disabled={isPending}
            >
              {isPending ? <SingleSpinner /> : "Create Exam"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateExam;

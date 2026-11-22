import { Badge, BADGE_CONTEXT, APP_STATUS } from "@/components/Renderer/badges";
import { BookOpenCheck, CalendarClock, ClipboardCheck, Dot, Info, Link2, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { numberSchema } from "../../../ComponentConfig/YupValidationSchema";
import HorizontalDashedLine from "../../../components/DashedLine/HorizonetalDashedLine";
import CustomDropdown from "../../../components/Dropdowns/Dropdowns";
import SectionCard from "../../../components/Election/SectionCard";
import StatTile from "../../../components/Election/StatTile";
import EmptyState from "../../../components/errors/EmptyState";
import FormErrorBanner from "../../../components/errors/FormErrorBanner";
import { NumberInput } from "../../../components/FormComponents/InputComponents";
import RectangleSkeleton from "../../../components/SkeletonPageLoader/RectangularSkeleton";
import { SingleSpinner } from "../../../components/Spinners/Spinners";
import LockedList from "../../../components/UpdateRules/LockedList";
import LockedValue from "../../../components/UpdateRules/LockedValue";
import ReadOnlyNotice from "../../../components/UpdateRules/ReadOnlyNotice";
import RuleDateField from "../../../components/UpdateRules/RuleDateField";
import { useGetExamUpdateRules } from "../../../hooks/exam/useGetExamUpdateRules";
import { useUpdateExam } from "../../../hooks/exam/useUpdateExam";
import { useFormError } from "../../../hooks/form/useFormError";
import { formatScheduleDate } from "../../../utils/feeSchedule/scheduleRules";
import { boundsFor, dateError } from "../../../utils/updateRules/dateRules";


const FIELD_LABELS = {
  school_year_id: "Academic year",
  exam_type_id: "Exam type",
  start_date: "Start date",
  end_date: "End date",
  max_score: "Max score",
};

const DEPENDENTS = [
  { key: "candidates", label: "Candidates", icon: Users },
  { key: "scores", label: "Recorded scores", icon: ClipboardCheck },
  { key: "timetable_slots", label: "Timetabled papers", icon: CalendarClock },
  { key: "linked_exams", label: "Exams including this CA", icon: Link2 },
];

const round = (value) => Math.round(Number(value) * 100) / 100;

/** The window limits ({ kind: "window" }) for an exam type's semester, for boundsFor's replace. */
const windowLimits = (window) =>
  window && {
    kind: "window",
    min: window.start_date && { date: window.start_date, reason: `${window.label} starts on ${formatScheduleDate(window.start_date)}` },
    max: window.end_date && { date: window.end_date, reason: `${window.label} ends on ${formatScheduleDate(window.end_date)}` },
  };

/** What the exam is: name, status, academic year, specialty, level and dates. */
function ExamSummary({ rules }) {
  const year = rules.academic_year ?? {};
  return (
    <div className="d-flex flex-column gap-2 font-size-sm">
      <div className="d-flex flex-row align-items-center gap-2">
        <div
          style={{ width: "2.5rem", height: "2.5rem", display: "grid", placeItems: "center" }}
          className="bg-primary-50 rounded-2 text-primary-500 flex-shrink-0"
        >
          <BookOpenCheck size={18} />
        </div>
        <div className="d-flex flex-column flex-grow-1" style={{ minWidth: 0 }}>
          <div className="d-flex flex-row align-items-center gap-2">
            <span className="fw-semibold text-truncate">{rules.exam_type?.name ?? "Exam"}</span>
            <Badge status={rules.status ?? APP_STATUS.UPCOMING} context={BADGE_CONTEXT.ACADEMIC_PERIOD} />
          </div>
          <div className="d-flex flex-row align-items-center text-iron-400 fw-light" style={{ minWidth: 0 }}>
            <span className="text-truncate">{year.specialty ?? "-"}</span>
            <Dot size={16} className="flex-shrink-0" />
            <span className="text-nowrap">{year.level ?? "-"}</span>
            <Dot size={16} className="flex-shrink-0" />
            <span className="text-nowrap">{year.name ?? "-"}</span>
          </div>
        </div>
      </div>
      <div className="d-flex flex-row flex-wrap align-items-center gap-3 font-size-xs text-iron-500">
        <span className="fw-semibold text-iron-700">
          {formatScheduleDate(rules.start_date)} – {formatScheduleDate(rules.end_date)}
        </span>
        <span>Out of {rules.max_score}</span>
        {rules.window?.start_date && (
          <span>
            Within {rules.window.label}, {formatScheduleDate(rules.window.start_date)} – {formatScheduleDate(rules.window.end_date)}
          </span>
        )}
      </div>
    </div>
  );
}

function Dependents({ counts }) {
  const shown = DEPENDENTS.filter((item) => (counts?.[item.key] ?? 0) > 0);
  if (shown.length === 0) return null;
  return (
    <SectionCard title="Linked to this exam" description="These were set up for this exam.">
      <div className="row g-2">
        {shown.map((item) => (
          <div key={item.key} className="col-6">
            <StatTile icon={item.icon} label={item.label} value={counts[item.key]} tone="neutral" />
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function UpdateExamForm({ rules, handleClose }) {
  const { fields } = rules;
  const currentType = useMemo(() => ({ id: rules.exam_type?.id, exam_name: rules.exam_type?.name, type: rules.exam_type?.type }), [rules.exam_type]);
  const [form, setForm] = useState({
    start_date: rules.start_date ?? "",
    end_date: rules.end_date ?? "",
    examType: currentType,
    max_score: String(rules.exam_portion ?? ""),
  });
  const [scoreValid, setScoreValid] = useState(true);
  const { mutate: updateExam, isPending } = useUpdateExam(handleClose, rules.id);
  const { formError, errorBannerRef, handleServerError, setClientError, clearFormError } =
    useFormError("Failed To Update Exam");

  const typeChanged = form.examType?.id !== currentType.id;
  // A new exam type brings its semester's dates; the API re-checks on save.
  const replace = typeChanged ? windowLimits(form.examType?.window) : undefined;
  const window = typeChanged ? form.examType?.window : rules.window;

  const startBounds = useMemo(
    () => boundsFor("start_date", fields.start_date, { start: form.start_date, end: form.end_date, replace, sameDay: true }),
    [fields.start_date, form.start_date, form.end_date, replace],
  );
  const endBounds = useMemo(
    () => boundsFor("end_date", fields.end_date, { start: form.start_date, end: form.end_date, replace, sameDay: true }),
    [fields.end_date, form.start_date, form.end_date, replace],
  );

  const scoreChanged = fields.max_score.editable && form.max_score !== "" && round(form.max_score) !== round(rules.exam_portion);
  const changes = {
    ...(fields.start_date.editable && form.start_date !== rules.start_date ? { start_date: form.start_date } : {}),
    ...(fields.end_date.editable && form.end_date !== rules.end_date ? { end_date: form.end_date } : {}),
    ...(typeChanged ? { exam_type_id: form.examType?.id } : {}),
    ...(scoreChanged ? { max_score: Number(form.max_score) } : {}),
  };
  const isDirty = Object.keys(changes).length > 0;

  // Dates are checked when they change, or when a new exam type moves the window.
  const startError = changes.start_date !== undefined || typeChanged ? dateError("start date", form.start_date, startBounds) : null;
  const endError = changes.end_date !== undefined || typeChanged ? dateError("end date", form.end_date, endBounds) : null;
  const scoreError = scoreChanged && !scoreValid ? "Enter a valid max score." : null;
  const problems = [startError, endError, scoreError].filter(Boolean);

  const set = (field, value) => {
    clearFormError();
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSave = () => {
    if (problems.length > 0) {
      setClientError("Some fields need attention", problems);
      return;
    }
    clearFormError();
    updateExam({ examId: rules.id, updateData: changes }, { onError: handleServerError });
  };

  const scoreSchema = useMemo(
    () =>
      numberSchema({
        min: 1,
        max: fields.max_score.max ?? 999,
        required: false,
        messages: { min: "Must be at least 1", max: `Must not exceed ${fields.max_score.max}` },
      }),
    [fields.max_score.max],
  );

  const isSemesterExam = !typeChanged && rules.ca_max_score > 0;
  const total = isSemesterExam && form.max_score !== "" ? round(Number(form.max_score) + rules.ca_max_score) : null;
  const canSave = isDirty && problems.length === 0 && !isPending;
  const anyEditable = ["start_date", "end_date", "exam_type_id", "max_score"].some((name) => fields[name].editable);

  return (
    <>
      <div className="d-flex flex-column gap-3 pt-2 px-2 pb-2 flex-shrink-0">
        <ExamSummary rules={rules} />
      </div>

      <div className="drawer-content px-2 pb-3 d-flex flex-column gap-3">
        <FormErrorBanner ref={errorBannerRef} error={formError} onDismiss={clearFormError} className="mb-0" />

        {rules.read_only && <ReadOnlyNotice>This exam is read-only. Nothing on it can be changed.</ReadOnlyNotice>}

        {anyEditable && (
          <SectionCard title="What you can change" description="Only these fields can be changed right now." bodyClassName="p-3 d-flex flex-column gap-2">
            <div className="d-flex flex-column gap-1">
              <label className="font-size-sm m-0">Exam type</label>
              {fields.exam_type_id.editable ? (
                <CustomDropdown
                  data={[currentType, ...(fields.exam_type_id.options ?? [])]}
                  displayKey={["exam_name"]}
                  valueKey={["id"]}
                  // The second argument is the whole option, with its semester window.
                  onSelect={(value, item) => set("examType", item ?? value)}
                  placeholder="Select exam type"
                  value={form.examType}
                  defaultValue={form.examType}
                  showFeedback={false}
                />
              ) : (
                <LockedValue value={rules.exam_type?.name ?? "-"} />
              )}
              {typeChanged && window?.start_date && (
                <span className="font-size-xs text-iron-500">
                  Its dates must fall within {window.label}: {formatScheduleDate(window.start_date)} – {formatScheduleDate(window.end_date)}.
                </span>
              )}
            </div>
            <RuleDateField
              id="exam-start"
              label="Start date"
              value={form.start_date}
              onChange={(value) => set("start_date", value)}
              bounds={startBounds}
              editable={fields.start_date.editable}
              lockedValue={formatScheduleDate(rules.start_date)}
            />
            <RuleDateField
              id="exam-end"
              label="End date"
              value={form.end_date}
              onChange={(value) => set("end_date", value)}
              bounds={endBounds}
              editable={fields.end_date.editable}
              lockedValue={formatScheduleDate(rules.end_date)}
            />
            <div className="d-flex flex-column gap-1">
              <label className="font-size-sm m-0">
                {isSemesterExam ? "Exam score (without the CA)" : "Max score"}
              </label>
              {fields.max_score.editable ? (
                <NumberInput
                  value={form.max_score}
                  onChange={(value) => set("max_score", value ?? "")}
                  onValidationChange={(valid) => setScoreValid(valid)}
                  validationSchema={scoreSchema}
                  step="0.01"
                  optional
                />
              ) : (
                <LockedValue value={isSemesterExam ? `${rules.exam_portion} + CA ${rules.ca_max_score}` : rules.max_score} />
              )}
              {total != null && (
                <span className="font-size-xs text-iron-500">
                  {form.max_score} + the CA's {rules.ca_max_score} = <span className="fw-semibold text-iron-700">{total}</span> in total
                </span>
              )}
              {scoreChanged && rules.dependents?.grade_scale && (
                <div className="d-flex flex-row align-items-start gap-2 rounded-3 bg-primary-50 px-2 py-2 font-size-xs text-iron-700">
                  <Info size={14} className="flex-shrink-0" style={{ marginTop: "0.1rem" }} />
                  <span>If the new total no longer matches the grade scale's max score, the grade scale is removed and must be configured again.</span>
                </div>
              )}
            </div>
          </SectionCard>
        )}

        <LockedList
          fields={fields}
          labels={FIELD_LABELS}
          description="Protected because of the exam's status or the records set up for it."
        />
        <Dependents counts={rules.dependents} />
      </div>

      <div className="drawer-footer">
        <div className="d-flex flex-column w-100 font-size-sm">
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
          <div className="d-flex flex-row align-items-center justify-content-between gap-3 p-2">
            <button type="button" className="border-none bg-none" onClick={() => handleClose?.()}>
              {anyEditable ? "Cancel" : "Close"}
            </button>
            {anyEditable && (
              <div className="d-flex flex-row align-items-center gap-3" style={{ minWidth: 0 }}>
                <span
                  className={`text-truncate ${problems.length ? "text-red-600" : isDirty ? "text-fern-600" : "text-iron-500"}`}
                  title={problems[0]}
                >
                  {problems.length ? problems[0] : isDirty ? "Ready to save" : "No changes yet"}
                </span>
                <button
                  type="button"
                  className="border-none rounded-3 primary-background text-white font-size-sm px-3 py-2 flex-shrink-0"
                  onClick={handleSave}
                  disabled={!canSave}
                  style={{ opacity: canSave ? 1 : 0.6 }}
                >
                  {isPending ? <SingleSpinner /> : "Save Changes"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * Edits an exam within the API's rules: the drawer loads what can change,
 * why the rest can't, and the allowed date range, from
 * GET exam/{id}/update-rules. Same layout as the semester update drawer.
 */
function UpdateExam({ handleClose, drawerData }) {
  const { data, isLoading, error } = useGetExamUpdateRules(drawerData?.id);

  if (isLoading) {
    return (
      <div className="d-flex flex-column gap-3 p-2">
        <RectangleSkeleton height="3.5rem" />
        <RectangleSkeleton height="14rem" />
        <RectangleSkeleton height="7rem" />
      </div>
    );
  }

  if (error || !data?.data) {
    return (
      <div className="drawer-content p-2">
        <EmptyState
          mascot="error"
          height="100%"
          mascotHeight="7rem"
          title={error?.response?.data?.errors?.title ?? "This exam could not be loaded"}
          description={error?.response?.data?.errors?.description ?? "Check your connection and try again."}
        />
      </div>
    );
  }

  return <UpdateExamForm rules={data.data} handleClose={handleClose} />;
}

export default UpdateExam;

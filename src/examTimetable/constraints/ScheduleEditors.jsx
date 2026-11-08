import { useDispatch, useSelector } from "react-redux";
import {
  IconButton,
  Note,
  OptionTile,
  Section,
  Stats,
  TextButton,
} from "../../components/SemesterTimetable/ConstraintWizard/WizardPrimitives";
import { patchExamConstraint, setExamConstraint } from "../../Slices/ExamTimetable/examTimetableSlice";
import { isRange, toMinutes } from "../../utils/examTimetable/buildRequest";
import { makeExamConstraintEditor } from "./ExamConstraintWizard";
import { EntitySelect, ExamDateSelect, formatExamDate, SetupNotice, TimeInput } from "./fields";

const useConstraint = (key) => useSelector((state) => state.examTimetable.constraints?.[key]);

/* -------------------------------------------------------------------------- */
/* Exam hours (operational period)                                            */
/* -------------------------------------------------------------------------- */

function OperationalPeriodConfigure({ setup }) {
  const dispatch = useDispatch();
  const op = useConstraint("operational_period");
  const patch = (changes) => dispatch(patchExamConstraint({ key: "operational_period", patch: changes }));
  const exceptions = op.date_exceptions ?? [];
  const exclusions = op.date_exclusions ?? [];
  const hours = isRange(op.start_time, op.end_time) ? toMinutes(op.end_time) - toMinutes(op.start_time) : null;

  return (
    <>
      <Section label="Daily exam hours" hint="No exam starts before or ends after these times.">
        <div className="d-flex flex-row align-items-center gap-2">
          <TimeInput label="Start" value={op.start_time} onChange={(value) => patch({ start_time: value })} />
          <span className="text-iron-500">to</span>
          <TimeInput label="End" value={op.end_time} onChange={(value) => patch({ end_time: value })} />
        </div>
        {hours !== null && <Stats items={[{ label: "Exam hours a day", value: (hours / 60).toFixed(hours % 60 ? 1 : 0), unit: "h" }]} />}
      </Section>

      <Section
        label="Dates without exams"
        hint="Holidays or days the halls are not available. Tap a date to exclude it."
      >
        <SetupNotice {...setup} />
        <div className="d-flex flex-row flex-wrap gap-1">
          {setup.dates.map((date) => {
            const excluded = exclusions.includes(date);
            return (
              <button
                key={date}
                type="button"
                className={`cw-day ${excluded ? "" : "is-selected"}`}
                style={{ width: "auto", padding: "0.25rem 0.5rem" }}
                aria-pressed={!excluded}
                title={excluded ? "No exams on this date" : "Exams can take place"}
                onClick={() =>
                  patch({ date_exclusions: excluded ? exclusions.filter((item) => item !== date) : [...exclusions, date] })
                }
              >
                <span className="cw-day__short">{formatExamDate(date)}</span>
              </button>
            );
          })}
        </div>
      </Section>

      <Section
        label="Different hours on some dates"
        hint="For example a half day."
        action={
          <TextButton
            icon="lucide:plus"
            onClick={() => patch({ date_exceptions: [...exceptions, { date: null, start_time: op.start_time, end_time: op.end_time }] })}
          >
            Add date
          </TextButton>
        }
      >
        {exceptions.length === 0 ? (
          <span className="text-iron-500 font-size-xs">Every date uses the daily exam hours.</span>
        ) : (
          exceptions.map((exception, index) => {
            const update = (changes) =>
              patch({ date_exceptions: exceptions.map((item, i) => (i === index ? { ...item, ...changes } : item)) });
            return (
              <div key={index} className="d-flex flex-row align-items-center gap-2 mb-2">
                <ExamDateSelect
                  value={exception.date}
                  dates={setup.dates.filter((date) => !exclusions.includes(date))}
                  exclude={exceptions.map((item) => item.date)}
                  onChange={(date) => update({ date })}
                />
                <TimeInput label="Start" value={exception.start_time} onChange={(value) => update({ start_time: value })} />
                <TimeInput label="End" value={exception.end_time} onChange={(value) => update({ end_time: value })} />
                <IconButton
                  icon="lucide:trash-2"
                  label="Remove"
                  tone="danger"
                  onClick={() => patch({ date_exceptions: exceptions.filter((_, i) => i !== index) })}
                />
              </div>
            );
          })
        )}
      </Section>
    </>
  );
}

export const OperationalPeriodEditor = makeExamConstraintEditor({
  configureTitle: "Exam hours",
  configureDescription: "Set when exams can take place each day of the exam period.",
  points: [
    { title: "Daily hours", text: "Every exam is placed between the start and end time." },
    { title: "Excluded dates", text: "No exam is placed on a date you exclude." },
    { title: "Date exceptions", text: "Some dates can have shorter or longer hours." },
  ],
  Configure: OperationalPeriodConfigure,
  summary: (constraints) => {
    const op = constraints.operational_period;
    return [
      { label: "Every date", value: `${op.start_time} – ${op.end_time}` },
      ...(op.date_exceptions ?? []).filter((item) => item.date).map((item) => ({
        label: formatExamDate(item.date),
        value: `${item.start_time} – ${item.end_time}`,
      })),
      ...(op.date_exclusions ?? []).map((date) => ({ label: formatExamDate(date), value: "No exams" })),
    ];
  },
});

/* -------------------------------------------------------------------------- */
/* Exam length (session duration)                                             */
/* -------------------------------------------------------------------------- */

const DURATIONS = [60, 90, 120, 150, 180, 240];
const durationLabel = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return [hours ? `${hours} h` : null, rest ? `${rest} min` : null].filter(Boolean).join(" ");
};

function SessionDurationConfigure({ setup }) {
  const dispatch = useDispatch();
  const duration = useConstraint("session_duration");
  const patch = (changes) => dispatch(patchExamConstraint({ key: "session_duration", patch: changes }));
  const exceptions = duration.course_exceptions ?? [];
  const courseName = (id) => setup.courses.find((course) => course.course_id === id)?.course_title ?? "Course";

  return (
    <>
      <Section label="Every exam lasts">
        <div className="row g-2">
          {DURATIONS.map((minutes) => (
            <div key={minutes} className="col-4">
              <OptionTile
                selected={Number(duration.duration) === minutes}
                onClick={() => patch({ duration: minutes })}
                title={durationLabel(minutes)}
              />
            </div>
          ))}
        </div>
        <div className="d-flex flex-row align-items-center gap-2 mt-2">
          <span className="text-iron-500">Or</span>
          <input
            type="number"
            min={15}
            max={720}
            step={15}
            className="form-control form-control-sm font-size-sm"
            style={{ width: "7rem" }}
            value={duration.duration ?? ""}
            onChange={(event) => patch({ duration: event.target.value ? Number(event.target.value) : null })}
          />
          <span className="text-iron-500">minutes</span>
        </div>
      </Section>

      <Section
        label="Courses with a different length"
        hint="For example a practical exam."
        action={
          <TextButton
            icon="lucide:plus"
            onClick={() => patch({ course_exceptions: [...exceptions, { course_id: null, duration: duration.duration }] })}
          >
            Add course
          </TextButton>
        }
      >
        <SetupNotice {...setup} />
        {exceptions.map((exception, index) => {
          const update = (changes) =>
            patch({ course_exceptions: exceptions.map((item, i) => (i === index ? { ...item, ...changes } : item)) });
          return (
            <div key={index} className="d-flex flex-row align-items-center gap-2 mb-2">
              <EntitySelect
                value={exception.course_id}
                placeholder="Course"
                onChange={(courseId) => update({ course_id: courseId })}
                options={setup.courses.map((course) => ({
                  value: course.course_id,
                  label: course.course_title,
                  disabled: exceptions.some((item, i) => i !== index && item.course_id === course.course_id),
                }))}
              />
              <input
                type="number"
                min={15}
                max={720}
                step={15}
                aria-label={`Length of ${courseName(exception.course_id)} in minutes`}
                className="form-control form-control-sm font-size-sm"
                style={{ width: "6rem" }}
                value={exception.duration ?? ""}
                onChange={(event) => update({ duration: event.target.value ? Number(event.target.value) : null })}
              />
              <span className="text-iron-500">min</span>
              <IconButton
                icon="lucide:trash-2"
                label="Remove"
                tone="danger"
                onClick={() => patch({ course_exceptions: exceptions.filter((_, i) => i !== index) })}
              />
            </div>
          );
        })}
      </Section>
    </>
  );
}

export const SessionDurationEditor = makeExamConstraintEditor({
  configureTitle: "Exam length",
  configureDescription: "Choose how long an exam lasts, with exceptions for some courses.",
  points: [
    { title: "One length for every exam", text: "Each course's exam session lasts this long." },
    { title: "Course exceptions", text: "Longer or shorter exams for specific courses." },
  ],
  Configure: SessionDurationConfigure,
  summary: (constraints, setup) => {
    const duration = constraints.session_duration;
    const name = (id) => setup.courses.find((course) => course.course_id === id)?.course_title ?? "Course";
    return [
      { label: "Every exam", value: duration.duration ? durationLabel(Number(duration.duration)) : "Not set" },
      ...(duration.course_exceptions ?? [])
        .filter((item) => item.course_id)
        .map((item) => ({ label: name(item.course_id), value: durationLabel(Number(item.duration) || 0) })),
    ];
  },
});

/* -------------------------------------------------------------------------- */
/* Student daily load                                                         */
/* -------------------------------------------------------------------------- */

function Stepper({ value, onChange, min = 0, max = 10, label }) {
  return (
    <div className="d-flex flex-row align-items-center gap-2">
      <IconButton icon="lucide:minus" label={`Fewer ${label}`} onClick={() => onChange(Math.max(min, Number(value) - 1))} />
      <span className="fw-semibold tabular-nums" style={{ minWidth: "1.5rem", textAlign: "center" }}>{value}</span>
      <IconButton icon="lucide:plus" label={`More ${label}`} onClick={() => onChange(Math.min(max, Number(value) + 1))} />
    </div>
  );
}

function DailyLoadConfigure({ setup }) {
  const dispatch = useDispatch();
  const load = useConstraint("student_daily_load_range");
  const patch = (changes) => dispatch(patchExamConstraint({ key: "student_daily_load_range", patch: changes }));
  const exceptions = load.date_exceptions ?? [];

  return (
    <>
      <Section label="Limit exams per day">
        <div className="form-check form-switch">
          <input
            id="daily-load-enabled"
            className="form-check-input"
            type="checkbox"
            checked={!!load.enabled}
            onChange={(event) => patch({ enabled: event.target.checked })}
          />
          <label htmlFor="daily-load-enabled" className="form-check-label">
            {load.enabled ? "Students sit a limited number of exams a day" : "No limit"}
          </label>
        </div>
      </Section>

      {load.enabled && (
        <>
          <Section label="Every date">
            <div className="d-flex flex-row gap-4">
              <div className="d-flex flex-column gap-1">
                <span className="text-iron-500 font-size-xs">At most</span>
                <Stepper label="exams" value={load.max_sessions} min={1} onChange={(value) => patch({ max_sessions: value, min_sessions: Math.min(load.min_sessions, value) })} />
              </div>
              <div className="d-flex flex-column gap-1">
                <span className="text-iron-500 font-size-xs">At least (on days with exams)</span>
                <Stepper label="exams" value={load.min_sessions} max={load.max_sessions} onChange={(value) => patch({ min_sessions: value })} />
              </div>
            </div>
            <Note>
              The scheduler keeps every date within this range when it can. A date that has to go over it is reported as a request not honoured.
            </Note>
          </Section>

          <Section
            label="Different limits on some dates"
            action={
              <TextButton
                icon="lucide:plus"
                onClick={() =>
                  patch({ date_exceptions: [...exceptions, { date: null, max_sessions: load.max_sessions, min_sessions: 0 }] })
                }
              >
                Add date
              </TextButton>
            }
          >
            {exceptions.map((exception, index) => {
              const update = (changes) =>
                patch({ date_exceptions: exceptions.map((item, i) => (i === index ? { ...item, ...changes } : item)) });
              return (
                <div key={index} className="d-flex flex-row align-items-center gap-3 mb-2">
                  <ExamDateSelect value={exception.date} dates={setup.dates} exclude={exceptions.map((item) => item.date)} onChange={(date) => update({ date })} />
                  <span className="text-iron-500 font-size-xs text-nowrap">at most</span>
                  <Stepper label="exams" value={exception.max_sessions} min={1} onChange={(value) => update({ max_sessions: value })} />
                  <IconButton icon="lucide:trash-2" label="Remove" tone="danger" onClick={() => patch({ date_exceptions: exceptions.filter((_, i) => i !== index) })} />
                </div>
              );
            })}
          </Section>
        </>
      )}
    </>
  );
}

export const DailyLoadEditor = makeExamConstraintEditor({
  configureTitle: "Exams per day",
  configureDescription: "Limit how many exams the students sit in one day.",
  points: [
    { title: "Maximum", text: "Dates are filled up to the maximum before more exams go on a date." },
    { title: "Minimum", text: "Days that have exams get at least this many, grouping exams together." },
    { title: "Spreading", text: "Without a limit, exams are spread over the whole exam period." },
  ],
  emptyText: "No daily limit: exams are spread over the exam period.",
  Configure: DailyLoadConfigure,
  summary: (constraints) => {
    const load = constraints.student_daily_load_range;
    if (!load?.enabled) return [];
    return [
      { label: "Every date", value: `${load.min_sessions} to ${load.max_sessions} exam(s)` },
      ...(load.date_exceptions ?? []).filter((item) => item.date).map((item) => ({
        label: formatExamDate(item.date),
        value: `at most ${item.max_sessions}`,
      })),
    ];
  },
});

/* -------------------------------------------------------------------------- */
/* Candidates per invigilator                                                 */
/* -------------------------------------------------------------------------- */

const RATIOS = [null, 20, 30, 40, 50];

function InvigilationConfigure({ setup }) {
  const dispatch = useDispatch();
  const ratio = useConstraint("candidates_per_invigilator");
  const candidates = setup.setup?.exam?.candidate_count ?? 0;

  return (
    <Section label="One invigilator for every" hint="Each hall always gets at least one invigilator.">
      <div className="row g-2">
        {RATIOS.map((value) => (
          <div key={value ?? "hall"} className="col-6">
            <OptionTile
              selected={(ratio ?? null) === value}
              onClick={() => dispatch(setExamConstraint({ key: "candidates_per_invigilator", value }))}
              title={value ? `${value} candidates` : "Hall (one per hall)"}
              meta={value && candidates ? `${Math.ceil(candidates / value)} for ${candidates} candidates` : undefined}
            />
          </div>
        ))}
      </div>
      <Note>Nobody invigilates an exam for a course they teach. That rule is always applied.</Note>
    </Section>
  );
}

export const InvigilationEditor = makeExamConstraintEditor({
  configureTitle: "Invigilators per hall",
  points: [
    { title: "Per hall", text: "Every hall used by an exam gets its own invigilators." },
    { title: "Never their own course", text: "Teachers are never given the exam of a course they teach." },
    { title: "Fair load", text: "Whoever has invigilated least is picked first." },
  ],
  Configure: InvigilationConfigure,
  summary: (constraints) => [
    {
      label: "Invigilators",
      value: Number(constraints.candidates_per_invigilator) > 0
        ? `One per ${constraints.candidates_per_invigilator} candidates`
        : "One per hall",
    },
  ],
});

import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import {
  DayPicker,
  OptionTile,
  Section,
  WizardFooter,
  WizardStep,
} from "../../../../components/SemesterTimetable/ConstraintWizard/WizardPrimitives";
import { useGetSemesterTimetablePeriods } from "../../../../hooks/semesterTimetable/useSemesterTimetablePeriodDuration";
import { useSchoolDayHours } from "../../../../hooks/jointCourseTimetable/useSchoolDayHours";
import { describeError } from "../../../../utils/jointCourseTimetable/recommendSlot";
import { dayLabel, formatTime, sortDays } from "../../../../utils/semesterTimetable/timeUtils";

const COURSE_ASSIGNMENT_PATH = "/joint-course";

function ChooseDaysStep({ nextStep, handleClose, drawerData }) {
  const { course, form, updateForm, proposal, generate, runGenerate } = drawerData;
  const periods = useGetSemesterTimetablePeriods();
  const schoolDay = useSchoolDayHours();
  const durations = periods.data?.data ?? [];
  const hasLecturer = (course.teachers ?? []).length > 0;
  const days = sortDays(form.days);

  const toggleDay = (day, isSelected) => {
    const nextDays = isSelected ? form.days.filter((item) => item !== day) : [...form.days, day];
    const overrides = { ...form.overrides };
    if (isSelected) delete overrides[day];
    updateForm({ days: nextDays, overrides });
  };

  const setOverride = (day, durationId) => {
    const overrides = { ...form.overrides };
    if (durationId) overrides[day] = durationId;
    else delete overrides[day];
    updateForm({ overrides });
  };

  // Moving back and forth keeps the proposal; only a changed request regenerates.
  const handleNext = () => (proposal ? nextStep() : runGenerate(nextStep));

  return (
    <WizardStep
      title="When is this course taught?"
      description="Choose the teaching days and how long one period lasts. We'll list every free slot on those days, and you pick the ones you want."
      footer={
        <WizardFooter
          onNext={handleNext}
          nextLabel={generate.isPending ? "Finding free slots…" : "Find free slots"}
          nextDisabled={!hasLecturer || days.length === 0 || !form.durationId || generate.isPending}
          hint={
            !hasLecturer
              ? "Assign a lecturer first"
              : days.length === 0
                ? "Choose at least one day"
                : "Choose a period duration"
          }
        />
      }
    >
      {!hasLecturer && <LecturerRequired title={course.course?.title} onAssign={handleClose} />}

      {generate.error && (
        <div className="jcs-alert jcs-alert--danger mb-3" role="alert">
          <Icon icon="lucide:circle-x" width={18} height={18} className="jcs-alert__icon" />
          <div className="d-flex flex-column gap-1">
            <span className="fw-semibold">
              {generate.error?.response?.data?.errors?.title ?? "Couldn't find free slots"}
            </span>
            <span>{describeError(generate.error, "Something went wrong. Try again.")}</span>
          </div>
        </div>
      )}

      {schoolDay.start && schoolDay.end && (
        <div className="jcs-context">
          <span className="jcs-context__item" title="Source: App Configuration · Timetable Settings">
            <Icon icon="lucide:clock" width={14} height={14} />
            School day {formatTime(schoolDay.start)} – {formatTime(schoolDay.end)}
            <span className="jcs-context__source">App Configuration</span>
          </span>
        </div>
      )}

      <Section label="Teaching days" hint={days.length ? days.map(dayLabel).join(", ") : "No day selected yet"}>
        <DayPicker selected={form.days} onToggle={toggleDay} />
      </Section>

      <Section label="Period duration" hint="One slot lasts one period">
        {periods.isLoading ? (
          <p className="jcs-field-hint mb-0">Loading durations…</p>
        ) : periods.error ? (
          <p className="jcs-field-hint jcs-field-hint--danger mb-0">
            {describeError(periods.error, "Couldn't load the period durations.")}
          </p>
        ) : (
          <div className="cw-options">
            {durations.map((duration) => (
              <OptionTile
                key={duration.id}
                selected={form.durationId === duration.id}
                onClick={() => updateForm({ durationId: duration.id })}
                title={duration.name}
                meta={`${duration.minutes} min`}
              />
            ))}
          </div>
        )}
      </Section>

      {form.durationId && days.length > 0 && (
        <Section label="Different duration on some days" hint="Optional">
          <ul className="jcs-counts">
            {days.map((day) => (
              <li key={day} className="jcs-count">
                <span className="fw-medium">{dayLabel(day)}</span>
                <select
                  className="form-select form-select-sm font-size-sm w-auto"
                  value={form.overrides[day] ?? ""}
                  onChange={(event) => setOverride(day, event.target.value || null)}
                  aria-label={`Period duration on ${dayLabel(day)}`}
                >
                  <option value="">Same as above</option>
                  {durations
                    .filter((duration) => duration.id !== form.durationId)
                    .map((duration) => (
                      <option key={duration.id} value={duration.id}>
                        {duration.name} ({duration.minutes} min)
                      </option>
                    ))}
                </select>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </WizardStep>
  );
}

function LecturerRequired({ title, onAssign }) {
  const navigate = useNavigate();
  return (
    <div className="jcs-alert jcs-alert--warn mb-3" role="alert">
      <Icon icon="lucide:user-round-x" width={18} height={18} className="jcs-alert__icon" />
      <div className="d-flex flex-column gap-1">
        <span className="fw-semibold">A lecturer must be assigned first</span>
        <span>
          {title ?? "This course"} has no lecturer yet. Slots are found around the lecturer's other
          classes, so assign one from the joint course's Manage Assignment, then come back.
        </span>
        <button
          type="button"
          className="cw-text-btn jcs-link"
          onClick={() => {
            onAssign();
            navigate(COURSE_ASSIGNMENT_PATH);
          }}
        >
          <span>Go to joint courses</span>
          <Icon icon="lucide:arrow-up-right" width={15} height={15} />
        </button>
      </div>
    </div>
  );
}

export default ChooseDaysStep;

import { eachDayOfInterval, format, parseISO } from "date-fns";
import { useMemo } from "react";
import { timeRangeSchema } from "../../ComponentConfig/YupValidationSchema";
import CustomDropdown, { MultiSelectDropdown } from "../../components/Dropdowns/Dropdowns";
import {
  NumberInput,
  TimeInput as AppTimeInput,
  TimeRangeInput,
} from "../../components/FormComponents/InputComponents";
import { TimeField } from "../../components/SemesterTimetable/ConstraintWizard/WizardPrimitives";
import { isTime } from "../../utils/examTimetable/buildRequest";
import { useKindState, useTimetableKind } from "../TimetableKindContext";

export const formatExamDate = (date, pattern = "EEE d MMM") => {
  if (!date) return "—";
  try {
    return format(parseISO(date), pattern);
  } catch {
    return date;
  }
};

/** The selected exam's scheduling data and the dates of its exam period. */
export function useExamSetup() {
  const kind = useTimetableKind();
  const exam = useKindState((state) => state.exam);
  const query = kind.queries.useSchedulingData(exam?.id);
  const setup = query.data?.data;
  const dates = useMemo(() => {
    const start = setup?.exam?.start_date;
    const end = setup?.exam?.end_date;
    if (!start || !end || start > end) return [];
    return eachDayOfInterval({ start: parseISO(start), end: parseISO(end) }).map((day) => format(day, "yyyy-MM-dd"));
  }, [setup?.exam?.start_date, setup?.exam?.end_date]);

  return {
    exam,
    setup,
    dates,
    courses: setup?.courses ?? [],
    halls: setup?.halls ?? [],
    invigilators: setup?.invigilators ?? [],
    isLoading: query.isLoading,
    error: query.error,
  };
}

/**
 * The exam's joint courses, split by whether their joint exam time is set.
 * Generation waits until `unscheduled` is empty.
 */
export function useJointCourseReadiness() {
  const setup = useExamSetup();
  const joint = setup.courses.filter((course) => course.is_joint);
  // Resits shared with other specialties always come with their time.
  const byTime = (a, b) => `${a.joint.slot.date} ${a.joint.slot.start_time}`.localeCompare(`${b.joint.slot.date} ${b.joint.slot.start_time}`);
  return {
    ...setup,
    joint,
    scheduled: joint.filter((course) => course.joint?.slot).sort(byTime),
    unscheduled: joint.filter((course) => !course.joint?.slot),
  };
}

// CustomDropdown reserves room for a feedback line; these pickers never show
// one, so the wrapper is sized to the trigger, as in the joint course drawer.
const PICKER_HEIGHT = 36;

/**
 * Single choice built on the app's CustomDropdown. `options` is
 * [{ value, label }]; `onChange` gets the chosen value.
 */
export function Picker({ value, onChange, options, placeholder, width = "100%", dropdownWidth = "18rem", isLoading = false }) {
  return (
    <div style={{ width, height: PICKER_HEIGHT, minWidth: 0 }}>
      <CustomDropdown
        data={options}
        displayKey={["label"]}
        valueKey={["value"]}
        value={value ?? null}
        onSelect={(selected) => onChange(selected?.value ?? null)}
        placeholder={placeholder}
        dropdownWidth={dropdownWidth}
        isLoading={isLoading}
        optional
        showFeedback={false}
      />
    </div>
  );
}

/** Several choices built on the app's MultiSelectDropdown; `onChange` gets the chosen values. */
export function MultiPicker({ values, onChange, options, placeholder, dropdownWidth = "22rem" }) {
  return (
    <div className="cw-compact-field">
      <MultiSelectDropdown
        data={options}
        displayKey={["label"]}
        valueKey={["value"]}
        value={values ?? []}
        onSelect={(selected) => onChange((selected ?? []).map((item) => item.value))}
        placeholder={placeholder}
        dropdownWidth={dropdownWidth}
        optional
      />
    </div>
  );
}

/** One of the exam's dates. Dates in `exclude` (other than the current value) are not offered. */
export function ExamDateSelect({ value, onChange, dates, exclude = [], placeholder = "Choose a date", width }) {
  const options = dates
    .filter((date) => date === value || !exclude.includes(date))
    .map((date) => ({ value: date, label: formatExamDate(date, "EEEE d MMMM") }));
  return <Picker value={value} onChange={onChange} options={options} placeholder={placeholder} width={width} />;
}

export function EntitySelect({ value, onChange, options, placeholder, width }) {
  return <Picker value={value} onChange={onChange} options={options.filter((option) => !option.disabled || option.value === value)} placeholder={placeholder} width={width} />;
}

/**
 * Start and end time with the app's TimeRangeInput. It keeps its own state,
 * so pass a `key` that changes when the times are reset from outside.
 */
export function TimeRange({ start, end, onStart, onEnd }) {
  return (
    <TimeField>
      <TimeRangeInput
        startValue={start ?? ""}
        endValue={end ?? ""}
        // The input reports every keystroke ("1_:__"); only complete times are kept.
        onStartTimeChange={(value) => isTime(value) && onStart(value)}
        onEndTimeChange={(value) => isTime(value) && onEnd(value)}
        validationSchema={timeRangeSchema({ optional: false })}
      />
    </TimeField>
  );
}

/** A single time with the app's TimeInput, which follows `value`. */
export function TimeInput({ value, onChange }) {
  return (
    <TimeField>
      <AppTimeInput value={value ?? ""} onChange={(next) => isTime(next) && onChange(next)} />
    </TimeField>
  );
}

/** Whole minutes with the app's NumberInput. */
export function MinutesInput({ value, onChange, placeholder = "Minutes" }) {
  return (
    <div className="cw-compact-field">
      <NumberInput
        value={value ?? ""}
        step="15"
        placeholder={placeholder}
        onChange={(next) => onChange(next === "" ? null : Number(next))}
      />
    </div>
  );
}

export function SetupNotice({ isLoading, error, exam }) {
  const kind = useTimetableKind();
  if (!exam) return <p className="text-iron-500 mb-0">Select {kind.id === "exam" ? "an exam" : "a resit exam"} first.</p>;
  if (isLoading) return <p className="text-iron-500 mb-0">Loading the {kind.noun}'s courses, halls and invigilators…</p>;
  if (error)
    return (
      <p className="text-red-700 mb-0">
        {error?.response?.data?.errors?.description ?? `Could not load the ${kind.noun}'s courses, halls and invigilators.`}
      </p>
    );
  return null;
}

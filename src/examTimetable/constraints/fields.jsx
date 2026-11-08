import { eachDayOfInterval, format, parseISO } from "date-fns";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useGetExamSchedulingData } from "../../hooks/examTimetableGeneration/queries";

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
  const exam = useSelector((state) => state.examTimetable.exam);
  const query = useGetExamSchedulingData(exam?.id);
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

export function ExamDateSelect({ value, onChange, dates, exclude = [], placeholder = "Date" }) {
  return (
    <select className="form-select form-select-sm font-size-sm" value={value ?? ""} onChange={(event) => onChange(event.target.value || null)}>
      <option value="">{placeholder}</option>
      {dates.map((date) => (
        <option key={date} value={date} disabled={exclude.includes(date) && date !== value}>
          {formatExamDate(date, "EEEE d MMMM")}
        </option>
      ))}
    </select>
  );
}

export function TimeInput({ value, onChange, label }) {
  return (
    <input
      type="time"
      aria-label={label}
      className="form-control form-control-sm font-size-sm"
      value={value ?? ""}
      step={900}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

export function EntitySelect({ value, onChange, options, placeholder }) {
  return (
    <select className="form-select form-select-sm font-size-sm" value={value ?? ""} onChange={(event) => onChange(event.target.value || null)}>
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value} disabled={option.disabled}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export function SetupNotice({ isLoading, error, exam }) {
  if (!exam) return <p className="text-iron-500 mb-0">Select an exam first.</p>;
  if (isLoading) return <p className="text-iron-500 mb-0">Loading the exam's courses, halls and invigilators…</p>;
  if (error)
    return (
      <p className="text-red-700 mb-0">
        {error?.response?.data?.errors?.description ?? "Could not load the exam's courses, halls and invigilators."}
      </p>
    );
  return null;
}

import { REQUEST_LIST_KEYS } from "../../Slices/ExamTimetable/examTimetableSlice";

const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;
export const isTime = (value) => TIME.test(String(value ?? ""));
export const toMinutes = (value) => {
  if (!isTime(value)) return null;
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
};
export const fromMinutes = (total) =>
  `${String(Math.floor(total / 60) % 24).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
export const isRange = (start, end) => toMinutes(start) !== null && toMinutes(end) !== null && toMinutes(end) > toMinutes(start);

/** Problems that stop generation; empty when the constraints can be sent. */
export function configurationProblems(constraints) {
  const problems = [];
  const op = constraints?.operational_period ?? {};
  if (!isRange(op.start_time, op.end_time)) {
    problems.push({ key: "operational_period", text: "Set valid daily exam hours (start before end)." });
  }
  (op.date_exceptions ?? []).forEach((exception) => {
    if (!isRange(exception.start_time, exception.end_time)) {
      problems.push({ key: "operational_period", text: `The exam hours on ${exception.date} are not valid.` });
    }
  });
  const duration = Number(constraints?.session_duration?.duration);
  if (!duration || duration < 1) {
    problems.push({ key: "session_duration", text: "Set how long an exam lasts." });
  } else if (isRange(op.start_time, op.end_time) && duration > toMinutes(op.end_time) - toMinutes(op.start_time)) {
    problems.push({ key: "session_duration", text: "An exam is longer than the daily exam hours." });
  }
  const load = constraints?.student_daily_load_range;
  if (load?.enabled && (!(load.max_sessions >= 1) || Number(load.min_sessions) > Number(load.max_sessions))) {
    problems.push({ key: "student_daily_load_range", text: "The daily exam range needs a maximum of at least 1 and a minimum no higher than it." });
  }
  REQUEST_LIST_KEYS.forEach((key) => {
    (constraints?.[key] ?? []).forEach((entry) => {
      if (!entry.date || !isRange(entry.start_time, entry.end_time)) {
        problems.push({ key, text: "A request is missing its date or has an invalid time." });
      }
    });
  });
  return problems;
}

const withoutIds = (entries, fields) =>
  (entries ?? [])
    .filter((entry) => fields.every((field) => entry[field] !== undefined && entry[field] !== null && entry[field] !== ""))
    .map((entry) => Object.fromEntries(fields.map((field) => [field, entry[field]])));

/** Request body for POST exam-timetable/generate. */
export function buildGenerateRequest(exam, version, constraints) {
  const op = constraints.operational_period;
  const duration = constraints.session_duration;
  const load = constraints.student_daily_load_range;

  const body = {
    exam_id: exam.id,
    version_id: version?.id ?? null,
    operational_period: {
      start_time: op.start_time,
      end_time: op.end_time,
      ...(op.date_exceptions?.length && { date_exceptions: withoutIds(op.date_exceptions, ["date", "start_time", "end_time"]) }),
      ...(op.date_exclusions?.length && { date_exclusions: op.date_exclusions }),
    },
    session_duration: {
      duration: Number(duration.duration),
      ...(duration.course_exceptions?.length && {
        course_exceptions: duration.course_exceptions
          .filter((exception) => exception.course_id && Number(exception.duration) > 0)
          .map((exception) => ({ course_id: exception.course_id, duration: Number(exception.duration) })),
      }),
    },
  };

  if (Number(constraints.candidates_per_invigilator) > 0) {
    body.candidates_per_invigilator = Number(constraints.candidates_per_invigilator);
  }

  if (load?.enabled) {
    body.student_daily_load_range = {
      max_sessions: Number(load.max_sessions),
      min_sessions: Number(load.min_sessions ?? 0),
      ...(load.date_exceptions?.length && {
        date_exceptions: load.date_exceptions.map((exception) => ({
          date: exception.date,
          max_sessions: Number(exception.max_sessions),
          min_sessions: Math.min(Number(exception.min_sessions ?? 0), Number(exception.max_sessions)),
        })),
      }),
    };
  }

  const lists = {
    course_requested_slot: ["course_id", "date", "start_time", "end_time"],
    hall_requested_slot: ["hall_id", "date", "start_time", "end_time"],
    invigilator_requested_slot: ["invigilator_id", "date", "start_time", "end_time"],
  };
  Object.entries(lists).forEach(([key, fields]) => {
    const entries = withoutIds(constraints[key], fields);
    if (entries.length) body[key] = entries;
  });

  const assignments = (constraints.requested_assignment ?? [])
    .filter((entry) => entry.course_id && entry.date && entry.start_time && entry.end_time)
    .map((entry) => ({
      course_id: entry.course_id,
      date: entry.date,
      start_time: entry.start_time,
      end_time: entry.end_time,
      ...(entry.hall_ids?.length && { hall_ids: entry.hall_ids }),
      ...(entry.invigilator_ids?.length && { invigilator_ids: entry.invigilator_ids }),
    }));
  if (assignments.length) body.requested_assignment = assignments;

  return body;
}

/** How many entries a constraint has set, for the sidebar badges. */
export function constraintCount(constraints, key) {
  const value = constraints?.[key];
  if (Array.isArray(value)) return value.length;
  if (key === "student_daily_load_range") return value?.enabled ? 1 : 0;
  if (key === "candidates_per_invigilator") return Number(value) > 0 ? 1 : 0;
  return null;
}

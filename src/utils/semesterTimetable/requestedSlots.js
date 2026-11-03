import { isCompleteTime, isValidRange } from "./timeUtils";

/**
 * Request-based soft constraints. Each one asks the generator to place a
 * subject (teacher, hall, course, or a full assignment) at specific times.
 * They share the same wizard steps; this config is all that differs.
 *
 * `fields`      the ids a request needs, in the order they are picked
 * `suggest`     how suggested times are found:
 *                 "recommended" -> /recommended-slots (needs teacher or course)
 *                 "periods"     -> /generate-slots (period grid for the day)
 */
export const REQUEST_CONSTRAINTS = {
  teacher_requested_time_windows: {
    key: "teacher_requested_time_windows",
    stepPrefix: "TEACHER_REQUESTED_SLOT",
    fields: ["teacher_id"],
    suggest: "recommended",
    noun: { one: "time window", many: "time windows" },
    title: "When should teachers teach?",
    description:
      "Ask the generator to schedule specific teachers inside time windows that suit them, such as mornings only or a fixed afternoon.",
    points: [
      "Each request names a teacher, a day and a time window.",
      "The generator prefers placing that teacher's lessons inside the window.",
      "This is a soft constraint: it is relaxed only when no valid timetable exists otherwise.",
    ],
    configureHint: "Pick a teacher to see the times they are free.",
  },
  hall_requested_time_windows: {
    key: "hall_requested_time_windows",
    stepPrefix: "HALL_REQUESTED_SLOT",
    fields: ["hall_id"],
    suggest: "periods",
    noun: { one: "time window", many: "time windows" },
    title: "When should halls be used?",
    description:
      "Reserve halls for specific time windows, for example a laboratory that is only available in the afternoon.",
    points: [
      "Each request names a hall, a day and a time window.",
      "The generator prefers placing lessons in that hall inside the window.",
      "Suggested times follow your period length, so they line up with the timetable grid.",
    ],
    configureHint:
      "Pick a hall, then choose one of the periods or enter a time.",
  },
  course_requested_time_slots: {
    key: "course_requested_time_slots",
    stepPrefix: "COURSE_REQUESTED_SLOT",
    fields: ["course_id"],
    suggest: "recommended",
    noun: { one: "time slot", many: "time slots" },
    title: "When should courses run?",
    description:
      "Ask the generator to schedule specific courses at preferred times, such as practical courses in the morning.",
    points: [
      "Each request names a course, a day and a time slot.",
      "Suggestions only show times when at least one teacher of the course is free.",
      "This is a soft constraint: it is relaxed only when no valid timetable exists otherwise.",
    ],
    configureHint: "Pick a course to see the times its teachers are free.",
  },
  requested_assignments: {
    key: "requested_assignments",
    stepPrefix: "REQUESTED_ASSIGNMENT",
    fields: ["course_id", "teacher_id", "hall_id"],
    suggest: "recommended",
    noun: { one: "assignment", many: "assignments" },
    title: "Place specific lessons yourself",
    description:
      "Request an exact lesson: a course, taught by a chosen teacher, in a chosen hall, at a chosen time.",
    points: [
      "Each request fixes the course, teacher, hall, day and time together.",
      "Suggestions only show times when the teacher, the hall and this class are all free.",
      "Picking a suggestion fills in a free teacher if you have not chosen one.",
    ],
    configureHint:
      "Pick a course to see when its teachers and the hall are free.",
  },
};

export const FIELD_LABELS = {
  teacher_id: "Teacher",
  hall_id: "Hall",
  course_id: "Course",
};

/** Older persisted state stored times as { value, isValid }. */
export const timeOf = (value) =>
  value && typeof value === "object" ? value.value : value;

export const requestEntryOf = (softConstraints, key) =>
  softConstraints?.[key] ?? { days: [], slots: [] };

export const requestsForDay = (entry, day) =>
  entry.slots.find((item) => item.day === day)?.slots ?? [];

export const allRequests = (entry) =>
  entry.slots.flatMap((item) =>
    (item.slots ?? []).map((request) => ({ ...request, day: item.day })),
  );

export const isRequestComplete = (request, config) =>
  config.fields.every((field) => Boolean(request[field])) &&
  isValidRange(timeOf(request.start_time), timeOf(request.end_time));

/** Requests in the shape the generation API validates. */
export const buildRequestPayload = (softConstraints, config) =>
  allRequests(requestEntryOf(softConstraints, config.key))
    .filter((request) => isRequestComplete(request, config))
    .map((request) => ({
      ...Object.fromEntries(
        config.fields.map((field) => [field, request[field]]),
      ),
      day: request.day,
      start_time: timeOf(request.start_time),
      end_time: timeOf(request.end_time),
    }));

/** Opening and closing time for a day, honouring operational exceptions. */
export const operatingWindowFor = (operationalPeriod, day) => {
  const exception = operationalPeriod?.day_exceptions?.find(
    (item) => item.day === day,
  );
  const source = exception ?? operationalPeriod;
  const start = source?.start_time?.value;
  const end = source?.end_time?.value;
  return isCompleteTime(start) &&
    isCompleteTime(end) &&
    isValidRange(start, end)
    ? { start_time: start, end_time: end }
    : null;
};

/** Period length for a day: the custom day duration, else the default. */
export const periodMinutesFor = (periodDuration, day) => {
  const custom = periodDuration?.day_exceptions?.find(
    (item) => item.day === day,
  );
  const minutes = custom?.duration_minutes;
  return (
    (typeof minutes === "object" ? minutes?.value : minutes) ??
    periodDuration?.duration_minutes ??
    null
  );
};

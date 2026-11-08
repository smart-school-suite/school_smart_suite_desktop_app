import { createSlice } from "@reduxjs/toolkit";

/**
 * Exam timetable page state: the exam being worked on, the selected version
 * (as last returned by the API; its scheduler_status decides what the page
 * shows) and the constraints the next generation is sent with.
 *
 * Constraint values are stored in the shape the API takes (see
 * utils/examTimetable/buildRequest), so the request is a direct copy.
 */
export const defaultConstraints = () => ({
  operational_period: {
    start_time: "08:00",
    end_time: "17:00",
    date_exceptions: [], // [{ date, start_time, end_time }]
    date_exclusions: [], // ["Y-m-d"]
  },
  session_duration: {
    duration: 120,
    course_exceptions: [], // [{ course_id, duration }]
  },
  student_daily_load_range: {
    enabled: false,
    min_sessions: 1,
    max_sessions: 2,
    date_exceptions: [], // [{ date, min_sessions, max_sessions }]
  },
  candidates_per_invigilator: null,
  // Request lists: entries carry a client id so rows can be edited and removed.
  course_requested_slot: [], // [{ id, course_id, date, start_time, end_time }]
  requested_assignment: [], // [{ id, course_id, date, start_time, end_time, hall_ids, invigilator_ids }]
  hall_requested_slot: [], // [{ id, hall_id, date, start_time, end_time }]
  invigilator_requested_slot: [], // [{ id, invigilator_id, date, start_time, end_time }]
});

export const REQUEST_LIST_KEYS = [
  "course_requested_slot",
  "requested_assignment",
  "hall_requested_slot",
  "invigilator_requested_slot",
];

const initialState = {
  exam: null,
  timetableVersion: null,
  constraints: defaultConstraints(),
};

let nextId = 0;
const newId = () => `req-${Date.now().toString(36)}-${(nextId++).toString(36)}`;

const examTimetableSlice = createSlice({
  name: "examTimetable",
  initialState,
  reducers: {
    setTimetableExam(state, action) {
      if (state.exam?.id !== action.payload?.id) {
        state.timetableVersion = null;
        // Requests and course or date specific settings belong to one exam.
        const kept = state.constraints ?? defaultConstraints();
        state.constraints = {
          ...defaultConstraints(),
          operational_period: { ...kept.operational_period, date_exceptions: [], date_exclusions: [] },
          session_duration: { ...kept.session_duration, course_exceptions: [] },
          student_daily_load_range: { ...kept.student_daily_load_range, date_exceptions: [] },
          candidates_per_invigilator: kept.candidates_per_invigilator ?? null,
        };
      }
      state.exam = action.payload ?? null;
    },
    setExamTimetableVersion(state, action) {
      state.timetableVersion = action.payload ?? null;
    },
    /** Replaces one constraint's value, e.g. { key: "session_duration", value: {...} }. */
    setExamConstraint(state, action) {
      const { key, value } = action.payload;
      state.constraints ??= defaultConstraints();
      state.constraints[key] = value;
    },
    /** Merges fields into an object constraint. */
    patchExamConstraint(state, action) {
      const { key, patch } = action.payload;
      state.constraints ??= defaultConstraints();
      state.constraints[key] = { ...(state.constraints[key] ?? {}), ...patch };
    },
    addExamRequest(state, action) {
      const { key, entry } = action.payload;
      state.constraints[key] = [...(state.constraints[key] ?? []), { id: newId(), ...entry }];
    },
    updateExamRequest(state, action) {
      const { key, id, patch } = action.payload;
      state.constraints[key] = (state.constraints[key] ?? []).map((entry) =>
        entry.id === id ? { ...entry, ...patch } : entry,
      );
    },
    removeExamRequest(state, action) {
      const { key, id } = action.payload;
      state.constraints[key] = (state.constraints[key] ?? []).filter((entry) => entry.id !== id);
    },
    resetExamConstraint(state, action) {
      state.constraints[action.payload] = defaultConstraints()[action.payload];
    },
  },
});

export const {
  setTimetableExam,
  setExamTimetableVersion,
  setExamConstraint,
  patchExamConstraint,
  addExamRequest,
  updateExamRequest,
  removeExamRequest,
  resetExamConstraint,
} = examTimetableSlice.actions;

export default examTimetableSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { daysOfWeek } from "../../data/data";

const makeTimeField = () => ({ value: null, isValid: null });
const makeDurationField = () => ({ value: null, isValid: null });
const makeDayException = (day) => ({
  day,
  start_time: makeTimeField(),
  end_time: makeTimeField(),
});

const makePeriodDurationException = (day) => ({
  day,
  duration_minutes: makeDurationField(),
});

const updateDayExceptions = (exceptions, patch) =>
  exceptions.map((exception) =>
    exception.day === patch.day
      ? {
          ...exception,
          ...(patch.start_time !== undefined && {
            start_time: patch.start_time,
          }),
          ...(patch.end_time !== undefined && { end_time: patch.end_time }),
        }
      : exception,
  );

const updatePeriodDurationExceptions = (exceptions, patch) =>
  exceptions.map((exception) =>
    exception.day === patch.day
      ? {
          ...exception,
          ...(patch.duration_minutes !== undefined && {
            duration_minutes: patch.duration_minutes,
          }),
        }
      : exception,
  );

const initialState = {
  schoolSemester: null,
  timetableVersion: null,
  timetableVersionStatus: null,
  isGenerating: false,
  hard_constraints: {
    break_period: {
      start_time: makeTimeField(),
      end_time: makeTimeField(),
      day_exceptions: daysOfWeek.map((day) => makeDayException(day.value)),
      no_break_exceptions: [],
    },
    operational_period: {
      operational_days: daysOfWeek.map((day) => day.value),
      start_time: makeTimeField(),
      end_time: makeTimeField(),
      day_exceptions: daysOfWeek.map((day) => makeDayException(day.value)),
    },
    schedule_period_duration_minutes: {
      duration_minutes: makeDurationField(),
      day_exceptions: daysOfWeek.map((day) =>
        makePeriodDurationException(day.value),
      ),
    }
  },
};

const semesterTimetableSlice = createSlice({
  name: "semesterTimetable",
  initialState,
  reducers: {
    setSchoolSemester(state, action) {
      state.schoolSemester = action.payload;
      state.timetableVersionStatus = null;
      state.timetableVersion = null;
    },

    setTimetableVersion(state, action) {
      state.timetableVersion = action.payload;
    },

    setTimetableVersionStatus(state, action){
       state.timetableVersionStatus = action.payload;
    },

    setGenerationStatus(state, action){
       state.isGenerating = action.payload;
    },
   
    //hard constraint reducers
    setOperationalPeriodField(state, action) {
      const { field, value } = action.payload;
      const op = state.hard_constraints.operational_period;

      if (field === "operational_days") {
        op.operational_days = value;
        op.day_exceptions = value.map(makeDayException);
        return;
      }

      if (field === "day_exceptions") {
        op.day_exceptions = updateDayExceptions(op.day_exceptions, value);
        return;
      }
      if (op[field]) {
        op[field].value = value;
      }
    },
    setOperationalPeriodValidation(state, action) {
      const { field, value } = action.payload;
      const op = state.hard_constraints.operational_period;

      if (field === "day_exceptions") {
        op.day_exceptions = updateDayExceptions(op.day_exceptions, value);
        return;
      }

      if (op[field]) {
        op[field].isValid = value;
      }
    },
    setBreakPeriodField(state, action) {
      const { field, value } = action.payload;
      const bp = state.hard_constraints.break_period;
      if (field === "day_exceptions") {
        bp.day_exceptions = updateDayExceptions(bp.day_exceptions, value);
        return;
      }
      if (field === "no_break_exceptions") {
        bp.no_break_exceptions = value;
        return;
      }
      if (bp[field]) {
        bp[field].value = value;
      }
    },
    setBreakPeriodValidation(state, action) {
      const { field, value } = action.payload;
      const bp = state.hard_constraints.break_period;

      if (field === "day_exceptions") {
        bp.day_exceptions = updateDayExceptions(bp.day_exceptions, value);
        return;
      }
      if (bp[field]) {
        bp[field].isValid = value;
      }
    },
    setPeriodDurationField(state, action) {
      const { field, value } = action.payload;
      const periodDuration =
        state.hard_constraints.schedule_period_duration_minutes;
      if (field == "day_exceptions") {
        periodDuration.day_exceptions = updatePeriodDurationExceptions(
          periodDuration.day_exceptions,
          value,
        );
        return;
      }
      if (periodDuration[field]) {
        periodDuration[field].value = value;
      }
    },
    setPeriodDurationValidation(state, action) {
      const { field, value } = action.payload;
      const periodDuration =
        state.hard_constraints.schedule_period_duration_minutes;

      if (field === "day_exceptions") {
        periodDuration.day_exceptions = updatePeriodDurationExceptions(
          periodDuration.day_exceptions,
          value,
        );
        return;
      }
      if (periodDuration[field]) {
        periodDuration[field].isValid = value;
      }
    },
  },
});

export const {
  setSchoolSemester,
  setTimetableVersion,
  setOperationalPeriodField,
  setOperationalPeriodValidation,
  setBreakPeriodField,
  setBreakPeriodValidation,
  setPeriodDurationField,
  setPeriodDurationValidation,
  setTimetableVersionStatus,
  setGenerationStatus
} = semesterTimetableSlice.actions;

export default semesterTimetableSlice.reducer;

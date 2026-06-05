import { createSlice } from "@reduxjs/toolkit";
import { daysOfWeek } from "../../data/data";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";

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
      day_exceptions: [],
      no_break_exceptions: [],
    },
    operational_period: {
      operational_days: [],
      start_time: makeTimeField(),
      end_time: makeTimeField(),
      day_exceptions: [],
    },
    schedule_period_duration_minutes: {
      duration_minutes: makeDurationField(),
      day_exceptions: daysOfWeek.map((day) =>
        makePeriodDurationException(day.value),
      ),
    },
  },
  soft_constraints: {
    requested_free_periods: {
      days: [],
      slots: [],
    },
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

    setTimetableVersionStatus(state, action) {
      state.timetableVersionStatus = action.payload;
    },

    setGenerationStatus(state, action) {
      state.isGenerating = action.payload;
    },

    //hard constraint reducers
    setOperationalPeriodField(state, action) {
      const { field, value } = action.payload;
      const op = state.hard_constraints.operational_period;

      if (field === "operational_days") {
        const day = value;
        const index = op.operational_days.indexOf(day);

        if (index !== -1) {
          op.operational_days.splice(index, 1);
        } else {
          op.operational_days.push(day);
        }
        return;
      }

      if (field === "day_exceptions") {
        const existingDayIndex = op.day_exceptions.findIndex(
          (exception) => exception.day === value.day,
        );
        const existingDay =
          existingDayIndex !== -1 ? op.day_exceptions[existingDayIndex] : null;

        if (existingDay) {
          if (!value.start_time && !value.end_time) {
            op.day_exceptions.splice(existingDayIndex, 1);
            return;
          }

          if (value.start_time) {
            existingDay.start_time = {
              value: value.start_time,
              isValid: value.isValid ?? null,
            };
          }
          if (value.end_time) {
            existingDay.end_time = {
              value: value.end_time,
              isValid: value.isValid ?? null,
            };
          }
          return;
        }

        if (!existingDay) {
          const newDay = {
            day: value.day,
            start_time: makeTimeField(),
            end_time: makeTimeField(),
          };

          if (value.start_time) {
            newDay.start_time = {
              value: value.start_time,
              isValid: value.isValid ?? null,
            };
          }
          if (value.end_time) {
            newDay.end_time = {
              value: value.end_time,
              isValid: value.isValid ?? null,
            };
          }

          op.day_exceptions.push(newDay);
          return;
        }
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
    //break period
    setDefaultBreakPeriodField(state, action) {
      const { field, value } = action.payload;
      const breakPeriod = state.hard_constraints.break_period;
      if (field === "start_time") {
        breakPeriod.start_time.value = value;
      }
      if (field === "end_time") {
        breakPeriod.end_time.value = value;
      }
    },
    setDefaultBreakPeriodFieldValidation(state, action) {
      const { field, value } = action.payload;
      const breakPeriod = state.hard_constraints.break_period;
      if (field === "start_time") {
        breakPeriod.start_time.isValid = value;
      }
      if (field === "end_time") {
        breakPeriod.end_time.isValid = value;
      }
    },
    addNoBreakPeriodDays(state, action) {
      const { day } = action.payload;
      const noBreakDays =
        state.hard_constraints.break_period.no_break_exceptions;
      if (!noBreakDays.includes(day)) {
        noBreakDays.push(day);
      } else {
        toast.custom(
          <ToastWarning
            title={"Existing Day"}
            description={`${day} already exists you can only add days that has not been already added`}
          />,
        );
      }
    },
    removeNoBreakPeriodDays(state, action) {
      const { day } = action.payload;
      const noBreakDays =
        state.hard_constraints.break_period.no_break_exceptions;

      const dayIndex = noBreakDays.indexOf(day);
      if (dayIndex !== -1) {
        noBreakDays.splice(dayIndex, 1);
      }
    },
    addCustomBreakDays(state, action) {
      const { day } = action.payload;
      const cBreakDays = state.hard_constraints.break_period.day_exceptions;
      const eCBDay = cBreakDays.find((cBreakDay) => cBreakDay.day == day);
      if (eCBDay) {
        toast.custom(
          <ToastWarning
            title={"Existing Day"}
            description={`${day} as already been added as the custom break day`}
          />,
        );
        return;
      }
      cBreakDays.push({
        day: day,
        start_time: makeTimeField(),
        end_time: makeTimeField(),
      });
    },
    removeCustomBreakDays(state, action) {
      const { day } = action.payload;
      const customBreakDays =
        state.hard_constraints.break_period.day_exceptions;
      const dayIndex = customBreakDays.findIndex((item) => item.day === day);
      if (dayIndex !== -1) {
        customBreakDays.splice(dayIndex, 1);
      }
    },
    setCustomBreakPeriod(state, action) {
      const { day, value, field } = action.payload;
      const cBreakDays = state.hard_constraints.break_period.day_exceptions;
      const existingCBreakDays = cBreakDays.find(
        (cBreakDay) => cBreakDay.day === day,
      );
      if (!existingCBreakDays) {
        return;
      }
      if (existingCBreakDays) {
        if (field === "start_time") {
          existingCBreakDays.start_time.value = value;
        }
        if (field === "end_time") {
          existingCBreakDays.end_time.value = value;
        }
      }
    },
    setCustomBreakPeriodValidation(state, action) {
      const { day, value, field } = action.payload;
      const cBreakDays = state.hard_constraints.break_period.day_exceptions;
      const cBreakDay = cBreakDays.find((cBreakDay) => cBreakDay.day === day);
      if (!cBreakDay) {
        return;
      }
      if (field === "start_time") {
        cBreakDay.start_time.isValid = value;
      }

      if (field === "end_time") {
        cBreakDay.end_time.isValid = value;
      }
    },

    //soft constraint reducers
    addRequestedFreePeriodDays(state, action) {
      const { day } = action.payload;
      const rF = state.soft_constraints.requested_free_periods;
      if (!rF.days.includes(day)) {
        rF.days.push(day);
      } else {
        toast.custom(
          <ToastWarning
            title={"Existing Day"}
            description={`${day} already exists you can only add days that has not been already added`}
          />,
        );
      }
    },
    removeRequestedFreePeriodDays(state, action) {
      const { day } = action.payload;
      const rF = state.soft_constraints.requested_free_periods;

      const dayIndex = rF.days.indexOf(day);
      if (dayIndex !== -1) {
        rF.days.splice(dayIndex, 1);
      }

      const slotIndex = rF.slots.findIndex((item) => item.day === day);
      if (slotIndex !== -1) {
        rF.slots.splice(slotIndex, 1);
      }
    },
    addRequestedFreePeriodSlot(state, action) {
      const { day } = action.payload;
      const rFSlots = state.soft_constraints.requested_free_periods.slots;
      const rF = state.soft_constraints.requested_free_periods;
      const existingDaySlot = rFSlots.find((item) => item.day === day);

      if (!rF.days.includes(day)) {
        toast.custom(
          <ToastWarning
            title={"Day Not Found"}
            description={`${day} has not been added as one of the free period days add it before creating slot`}
          />,
        );
      }
      const newSlotDetail = {
        id: `slot_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        start_time: makeTimeField(),
        end_time: makeTimeField(),
      };

      if (existingDaySlot) {
        existingDaySlot.slots.push(newSlotDetail);
      } else {
        rFSlots.push({
          day: day,
          slots: [newSlotDetail],
        });
      }
    },
    removeRequestedFreePeriodSlot(state, action) {
      const { day, slotId } = action.payload;
      const rFSlots = state.soft_constraints.requested_free_periods.slots;
      const existingDaySlot = rFSlots.find((item) => item.day === day);

      if (existingDaySlot) {
        existingDaySlot.slots = existingDaySlot.slots.filter(
          (slot) => slot.id !== slotId,
        );

        if (existingDaySlot.slots.length === 0) {
          const index = rFSlots.indexOf(existingDaySlot);
          rFSlots.splice(index, 1);
        }
      }
    },
    setRequestedFreePeriodSlot(state, action) {
      const { day, slotId, field, value } = action.payload;
      const rFSlots = state.soft_constraints.requested_free_periods.slots;
      const existingDaySlot = rFSlots.find((item) => item.day === day);

      if (existingDaySlot) {
        const targetSlot = existingDaySlot.slots.find(
          (slot) => slot.id === slotId,
        );

        if (targetSlot) {
          if (field === "start_time") {
            targetSlot.start_time.value = value;
          }

          if (field === "end_time") {
            targetSlot.end_time.value = value;
          }
        }
      }
    },
    setRequestedFreePeriodValidation(state, action) {
      const { day, slotId, field, value } = action.payload;
      const rFSlots = state.soft_constraints.requested_free_periods.slots;
      const existingDaySlot = rFSlots.find((item) => item.day === day);

      if (existingDaySlot) {
        const targetSlot = existingDaySlot.slots.find(
          (slot) => slot.id === slotId,
        );

        if (targetSlot) {
          if (field === "start_time") {
            targetSlot.start_time.isValid = value;
          }

          if (field === "end_time") {
            targetSlot.end_time.isValid = value;
          }
        }
      }
    },
    removeAllRequestedFreePeriodSlotsByDay(state, action) {
      const { day } = action.payload;
      const rFSlots = state.soft_constraints.requested_free_periods.slots;
      const existingDaySlot = rFSlots.find((item) => item.day === day);
      existingDaySlot.slots = [];
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
  setGenerationStatus,
  addRequestedFreePeriodDays,
  removeRequestedFreePeriodDays,
  addRequestedFreePeriodSlot,
  removeRequestedFreePeriodSlot,
  setRequestedFreePeriodSlot,
  setRequestedFreePeriodValidation,
  removeAllRequestedFreePeriodSlotsByDay,
  setDefaultBreakPeriodField,
  setDefaultBreakPeriodFieldValidation,
  removeNoBreakPeriodDays,
  addNoBreakPeriodDays,
  addCustomBreakDays,
  removeCustomBreakDays,
  setCustomBreakPeriodValidation,
  setCustomBreakPeriod,
} = semesterTimetableSlice.actions;

export default semesterTimetableSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import {
  SLOT_ORIGIN,
  createSlot,
  draftFromCourse,
  draftMatchesCourse,
  syncSlots,
} from "../../utils/jointCourseTimetable/slotDraft";

const initialState = {
  term: null,
  selectedCourseId: null,
  // Unsaved slot configurations keyed by semester joint course id. The slice is
  // persisted, so closing the drawer keeps unfinished work.
  drafts: {},
};

const draftOf = (state, courseId) => state.drafts?.[courseId];

const jointCourseTimetableSlice = createSlice({
  name: "jointCourseTimetable",
  initialState,
  reducers: {
    setJointCourseTerm: (state, action) => {
      if (state.term?.id !== action.payload?.id) {
        state.selectedCourseId = null;
      }
      state.term = action.payload;
    },
    setSelectedJointCourse: (state, action) => {
      state.selectedCourseId = action.payload;
    },

    /** Start a draft from the saved slots unless one is already in progress. */
    openSlotDraft: (state, action) => {
      const { course } = action.payload;
      state.drafts ??= {};
      const existing = state.drafts[course.id];
      // Resume real unsaved work; otherwise start from what the server has.
      if (existing && !draftMatchesCourse(existing, course)) {
        existing.restored = true;
        existing.focusSlotId = null;
        return;
      }
      state.drafts[course.id] = draftFromCourse(course);
    },
    discardSlotDraft: (state, action) => {
      const { course } = action.payload;
      state.drafts ??= {};
      state.drafts[course.id] = draftFromCourse(course);
    },
    clearSlotDraft: (state, action) => {
      delete state.drafts?.[action.payload];
    },
    dismissDraftNotice: (state, action) => {
      const draft = draftOf(state, action.payload);
      if (draft) draft.restored = false;
    },

    toggleTeachingDay: (state, action) => {
      const { courseId, day } = action.payload;
      const draft = draftOf(state, courseId);
      if (!draft) return;
      if (draft.days.includes(day)) {
        draft.days = draft.days.filter((item) => item !== day);
        delete draft.counts[day];
      } else {
        draft.days.push(day);
      }
      draft.slots = syncSlots(draft.slots, draft.days, draft.counts);
    },
    setDaySlotCount: (state, action) => {
      const { courseId, day, count } = action.payload;
      const draft = draftOf(state, courseId);
      if (!draft || !draft.days.includes(day)) return;
      draft.counts[day] = Math.max(1, count);
      draft.slots = syncSlots(draft.slots, draft.days, draft.counts);
    },

    /**
     * Change a slot's values. `origin` says who changed them; editing a slot
     * that came from an accepted recommendation marks it as adjusted.
     */
    updateSlot: (state, action) => {
      const { courseId, slotId, changes, origin = SLOT_ORIGIN.MANUAL, remount = false } =
        action.payload;
      const slot = draftOf(state, courseId)?.slots.find((item) => item.id === slotId);
      if (!slot) return;
      Object.assign(slot, changes);
      const wasRecommended = [SLOT_ORIGIN.RECOMMENDED, SLOT_ORIGIN.ADJUSTED].includes(
        slot.origin,
      );
      slot.origin =
        origin === SLOT_ORIGIN.MANUAL && wasRecommended ? SLOT_ORIGIN.ADJUSTED : origin;
      if (remount) slot.revision += 1;
    },
    resetSlot: (state, action) => {
      const { courseId, slotId } = action.payload;
      const slot = draftOf(state, courseId)?.slots.find((item) => item.id === slotId);
      if (!slot) return;
      Object.assign(slot, {
        start_time: "",
        end_time: "",
        hall_id: null,
        hall_name: null,
        origin: SLOT_ORIGIN.EMPTY,
        revision: slot.revision + 1,
      });
    },
    /** Removing or adding a slot changes that day's count so step 2 stays in sync. */
    removeSlot: (state, action) => {
      const { courseId, slotId } = action.payload;
      const draft = draftOf(state, courseId);
      const slot = draft?.slots.find((item) => item.id === slotId);
      if (!slot) return;
      draft.slots = draft.slots.filter((item) => item.id !== slotId);
      const remaining = draft.slots.filter((item) => item.day === slot.day).length;
      if (remaining === 0) {
        draft.days = draft.days.filter((day) => day !== slot.day);
        delete draft.counts[slot.day];
      } else {
        draft.counts[slot.day] = remaining;
      }
    },
    addSlot: (state, action) => {
      const { courseId, day } = action.payload;
      const draft = draftOf(state, courseId);
      if (!draft || !draft.days.includes(day)) return;
      draft.counts[day] = (draft.counts[day] ?? 0) + 1;
      const lastIndex = draft.slots.map((slot) => slot.day).lastIndexOf(day);
      draft.slots.splice(lastIndex + 1, 0, createSlot(day));
    },
    setFocusSlot: (state, action) => {
      const { courseId, slotId } = action.payload;
      const draft = draftOf(state, courseId);
      if (draft) draft.focusSlotId = slotId;
    },
  },
});

export const {
  setJointCourseTerm,
  setSelectedJointCourse,
  openSlotDraft,
  discardSlotDraft,
  clearSlotDraft,
  dismissDraftNotice,
  toggleTeachingDay,
  setDaySlotCount,
  updateSlot,
  resetSlot,
  removeSlot,
  addSlot,
  setFocusSlot,
} = jointCourseTimetableSlice.actions;

export default jointCourseTimetableSlice.reducer;

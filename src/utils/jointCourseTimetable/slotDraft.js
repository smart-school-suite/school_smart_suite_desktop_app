import { sortDays, toMinutes } from "../semesterTimetable/timeUtils";

/*
 * Pure helpers for the joint course slot draft.
 *
 * Three separate ideas live in this feature and are kept apart on purpose:
 *  1. Slot creation       – empty slots generated from the admin's daily counts (here).
 *  2. Slot recommendation – the backend proposes a hall and time (recommendSlot.js).
 *  3. Slot allocation     – the admin accepts or types the final values, and the
 *                           backend revalidates everything on save.
 */

export const TEACHING_DAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

/** How a slot's current values were set. */
export const SLOT_ORIGIN = {
  EMPTY: "empty",
  MANUAL: "manual",
  RECOMMENDED: "recommended",
  ADJUSTED: "adjusted", // accepted a recommendation, then changed it
  SAVED: "saved", // loaded from the saved timetable
};

let sequence = 0;
const tempId = () => `slot-${Date.now().toString(36)}-${(sequence += 1)}`;

export const createSlot = (day, values = {}) => ({
  id: tempId(),
  day,
  start_time: values.start_time ?? "",
  end_time: values.end_time ?? "",
  hall_id: values.hall_id ?? null,
  hall_name: values.hall_name ?? null, // for display only
  origin: values.origin ?? SLOT_ORIGIN.EMPTY,
  // Bumped whenever values are set from outside the time inputs (accepting a
  // recommendation, resetting) so the uncontrolled inputs remount.
  revision: 0,
});

/** A draft built from the course's saved slots, or an empty one. */
export const draftFromCourse = (course) => {
  const saved = course?.slots ?? [];
  const days = sortDays([...new Set(saved.map((slot) => slot.day))]);
  const counts = {};
  saved.forEach((slot) => {
    counts[slot.day] = (counts[slot.day] ?? 0) + 1;
  });
  return {
    days,
    counts,
    slots: saved.map((slot) =>
      createSlot(slot.day, {
        start_time: slot.start_time,
        end_time: slot.end_time,
        hall_id: slot.hall?.id ?? null,
        hall_name: slot.hall?.name ?? null,
        origin: SLOT_ORIGIN.SAVED,
      }),
    ),
    restored: false,
    focusSlotId: null,
  };
};

const signature = (slots) =>
  slots
    .map((slot) => [slot.day, slot.start_time, slot.end_time, slot.hall_id ?? slot.hall?.id ?? null].join("|"))
    .sort()
    .join(";");

/** True when the draft holds the same slots as the saved course. */
export const draftMatchesCourse = (draft, course) =>
  signature(draft.slots) === signature(course?.slots ?? []) &&
  draft.days.every((day) => draft.counts[day]) &&
  draft.days.length === new Set((course?.slots ?? []).map((slot) => slot.day)).size;

/**
 * Keep slots in step with the selected days and per-day counts: drop slots of
 * removed days, add empty slots where a count grew, trim from the end where it
 * shrank. Existing slot values are never touched.
 */
export const syncSlots = (slots, days, counts) =>
  sortDays(days).flatMap((day) => {
    const target = counts[day] ?? 0;
    const current = slots.filter((slot) => slot.day === day);
    const kept = current.slice(0, target);
    const added = Array.from({ length: Math.max(target - kept.length, 0) }, () =>
      createSlot(day),
    );
    return [...kept, ...added];
  });

export const slotsForDay = (slots, day) => slots.filter((slot) => slot.day === day);

/** 1-based position of a slot within its day. */
export const slotNumber = (slots, slot) =>
  slotsForDay(slots, slot.day).findIndex((item) => item.id === slot.id) + 1;

export const slotDuration = (slot) => {
  const start = toMinutes(slot.start_time);
  const end = toMinutes(slot.end_time);
  return start !== null && end !== null && end > start ? end - start : null;
};

export const totalSlotCount = (days, counts) =>
  days.reduce((sum, day) => sum + (counts[day] ?? 0), 0);

/** Payload for PUT joint-course-timetable/{id}/slots. Order matches slot_index in conflicts. */
export const toSavePayload = (slots, teacherId) =>
  slots.map((slot) => ({
    day: slot.day,
    start_time: slot.start_time,
    end_time: slot.end_time,
    hall_id: slot.hall_id,
    ...(teacherId ? { teacher_id: teacherId } : {}),
  }));

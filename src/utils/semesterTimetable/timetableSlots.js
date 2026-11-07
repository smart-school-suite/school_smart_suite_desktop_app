// Helpers for the generated semester timetable slots
// (GET semester-timetable/version/{id}/slots).

// The API marks joint slots with is_joint; older API builds only have
// slot_type "joint".
export const isJointSlot = (slot) =>
  slot?.is_joint === true || slot?.slot_type === "joint";

const sameJointSession = (a, b) =>
  isJointSlot(a) &&
  isJointSlot(b) &&
  a.course_id === b.course_id &&
  a.teacher_id === b.teacher_id &&
  a.hall_id === b.hall_id &&
  a.end_time === b.start_time;

// The grid splits a joint course into one slot per period. Show back-to-back
// periods of the same joint course as one card spanning the whole session.
export const mergeJointSessions = (slots = []) =>
  slots.reduce((merged, slot) => {
    const previous = merged[merged.length - 1];
    if (previous && sameJointSession(previous, slot)) {
      merged[merged.length - 1] = {
        ...previous,
        end_time: slot.end_time,
        period_count: (previous.period_count ?? 1) + 1,
      };
      return merged;
    }
    merged.push(isJointSlot(slot) ? { ...slot, period_count: 1 } : slot);
    return merged;
  }, []);

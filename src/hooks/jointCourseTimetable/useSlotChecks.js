import { useQueries } from "@tanstack/react-query";
import { getJointCourseRecommendedSlots } from "../../services/jointCourseTimetable";
import { describeError } from "../../utils/jointCourseTimetable/recommendSlot";
import { slotDuration } from "../../utils/jointCourseTimetable/slotDraft";
import {
  isCheckable,
  slotStatus,
  validateSlot,
} from "../../utils/jointCourseTimetable/slotValidation";

export const SLOT_CHECK_KEY = "joint-course-slot-check";

/*
 * Asks the server whether each fully entered slot is free, using the
 * recommended-slots endpoint with a window equal to the slot itself: the
 * lecturer, the hall, other joint courses and other timetables are all
 * checked there. Local rules run first; a slot that fails them is not sent.
 */
const checkSlot = async (courseId, teacherId, slot) => {
  const response = await getJointCourseRecommendedSlots(courseId, {
    day: slot.day,
    duration_minutes: slotDuration(slot),
    hall_id: slot.hall_id,
    start_time: slot.start_time,
    end_time: slot.end_time,
    ...(teacherId ? { teacher_id: teacherId } : {}),
  });
  const result = response?.data ?? {};
  const free = (result.recommended ?? []).length > 0;
  return {
    status: free ? "available" : "conflict",
    reasons: free
      ? []
      : (result.unavailable?.[0]?.reasons ?? [result.summary?.message]).filter(Boolean),
  };
};

/**
 * Local and server checks for every slot.
 * Returns { bySlot: { [slotId]: { local, check, status } }, isChecking }.
 */
export const useSlotChecks = ({ courseId, teacherId, slots, periodMinutes }) => {
  const locals = slots.map((slot) => validateSlot(slot, slots, periodMinutes));

  const queries = useQueries({
    queries: slots.map((slot, index) => ({
      queryKey: [
        SLOT_CHECK_KEY,
        courseId,
        teacherId,
        slot.day,
        slot.start_time,
        slot.end_time,
        slot.hall_id,
      ],
      queryFn: () => checkSlot(courseId, teacherId, slot),
      enabled: Boolean(courseId) && isCheckable(locals[index]),
      staleTime: 30_000,
      retry: false,
    })),
  });

  const bySlot = {};
  slots.forEach((slot, index) => {
    const query = queries[index];
    const check = !isCheckable(locals[index])
      ? null
      : query.error
        ? {
            status: "error",
            reasons: [describeError(query.error, "Could not check this slot.")],
          }
        : (query.data ?? { status: "checking" });
    bySlot[slot.id] = {
      local: locals[index],
      check,
      status: slotStatus(locals[index], check),
      refetch: query.refetch,
    };
  });

  return {
    bySlot,
    isChecking: queries.some((query) => query.isFetching),
  };
};

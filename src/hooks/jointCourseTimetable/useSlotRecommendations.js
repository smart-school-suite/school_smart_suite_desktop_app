import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { updateSlot } from "../../Slices/jointCourse/jointCourseTimetableSlice";
import {
  describeError,
  findSlotOptions,
} from "../../utils/jointCourseTimetable/recommendSlot";
import { SLOT_ORIGIN, slotDuration } from "../../utils/jointCourseTimetable/slotDraft";

/*
 * Recommendation state for the slots of one draft:
 * { [slotId]: { status: "loading"|"ready"|"empty"|"error", options, selected, message } }.
 * Suggestions are never written to the draft until the admin accepts one.
 */
export const useSlotRecommendations = ({ courseId, teacher, periodMinutes, slots }) => {
  const dispatch = useDispatch();
  const [bySlot, setBySlot] = useState({});
  const [isFindingAll, setIsFindingAll] = useState(false);

  const setFor = (slotId, value) =>
    setBySlot((current) => ({ ...current, [slotId]: { ...current[slotId], ...value } }));

  /** Slots with complete times, plus suggestions still on screen, are kept free. */
  const reservedFor = useCallback(
    (slotId, pending = bySlot) => [
      ...slots.filter((slot) => slot.id !== slotId && slotDuration(slot) !== null),
      ...Object.entries(pending)
        .filter(([id, entry]) => id !== slotId && entry?.status === "ready")
        .map(([, entry]) => entry.options[entry.selected]),
    ],
    [slots, bySlot],
  );

  const minutesFor = (slot) => slotDuration(slot) ?? periodMinutes;

  const find = async (slot, pending) => {
    const minutes = minutesFor(slot);
    if (!minutes) {
      setFor(slot.id, {
        status: "error",
        options: [],
        message:
          "Set a start and end time first, or set the period duration in App Configuration, so we know how long a slot is.",
      });
      return null;
    }
    setFor(slot.id, { status: "loading", options: [], selected: 0, showAlternatives: false });
    try {
      const result = await findSlotOptions({
        courseId,
        teacherId: teacher?.id,
        lecturerName: teacher?.name,
        day: slot.day,
        minutes,
        reserved: reservedFor(slot.id, pending),
        preferredHallId: slot.hall_id,
      });
      const entry = {
        status: result.options.length ? "ready" : "empty",
        options: result.options,
        selected: 0,
        message: result.message,
        showAlternatives: false,
      };
      setFor(slot.id, entry);
      return entry;
    } catch (error) {
      setFor(slot.id, {
        status: "error",
        options: [],
        message: describeError(error, "We couldn't get recommendations. Try again."),
      });
      return null;
    }
  };

  /** One slot at a time, so each suggestion avoids the ones made before it. */
  const findAll = async (targets) => {
    setIsFindingAll(true);
    const pending = { ...bySlot };
    for (const slot of targets) {
      const entry = await find(slot, pending);
      if (entry) pending[slot.id] = entry;
    }
    setIsFindingAll(false);
  };

  const dismiss = (slotId) =>
    setBySlot((current) => {
      const next = { ...current };
      delete next[slotId];
      return next;
    });

  const select = (slotId, index) => setFor(slotId, { selected: index });
  const toggleAlternatives = (slotId) =>
    setFor(slotId, { showAlternatives: !bySlot[slotId]?.showAlternatives });

  const accept = (slotId) => {
    const entry = bySlot[slotId];
    const option = entry?.options?.[entry.selected];
    if (!option) return;
    dispatch(
      updateSlot({
        courseId,
        slotId,
        changes: {
          start_time: option.start_time,
          end_time: option.end_time,
          hall_id: option.hall_id,
          hall_name: option.hall_name,
        },
        origin: SLOT_ORIGIN.RECOMMENDED,
        remount: true,
      }),
    );
    dismiss(slotId);
  };

  const readyIds = Object.keys(bySlot).filter((id) => bySlot[id]?.status === "ready");
  const acceptAll = () => readyIds.forEach(accept);

  return {
    bySlot,
    find,
    findAll,
    isFindingAll,
    dismiss,
    select,
    toggleAlternatives,
    accept,
    acceptAll,
    readyCount: readyIds.length,
  };
};

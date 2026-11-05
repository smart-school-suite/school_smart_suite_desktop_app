import { useMemo } from "react";
import CustomDropdown from "../../../../components/Dropdowns/Dropdowns";
import { useGetJointCourseHallAvailability } from "../../../../hooks/jointCourseTimetable/useGetJointCourseHallAvailability";
import { describeError } from "../../../../utils/jointCourseTimetable/recommendSlot";
import { slotDuration } from "../../../../utils/jointCourseTimetable/slotDraft";
import {
  MAX_SLOT_MINUTES,
  MIN_SLOT_MINUTES,
} from "../../../../utils/jointCourseTimetable/slotValidation";
import { dayLabel } from "../../../../utils/semesterTimetable/timeUtils";

const DISPLAY_KEY = ["name", "meta"];
const VALUE_KEY = ["id"];

/**
 * Searchable hall picker. Lists the school's available halls with capacity,
 * location and whether each is free: at the slot's exact time once it has
 * one, otherwise how many free times it has that day.
 */
function HallSelect({ courseId, teacherId, slot, periodMinutes, onSelect }) {
  const duration = slotDuration(slot);
  const exact = duration !== null && duration >= MIN_SLOT_MINUTES && duration <= MAX_SLOT_MINUTES;
  const minutes = exact ? duration : periodMinutes;
  const payload = minutes
    ? {
        duration_minutes: minutes,
        days: [slot.day],
        ...(teacherId ? { teacher_id: teacherId } : {}),
        ...(exact ? { start_time: slot.start_time, end_time: slot.end_time } : {}),
      }
    : null;
  const { data, isLoading, error } = useGetJointCourseHallAvailability(courseId, payload);

  const halls = useMemo(
    () =>
      (data?.data?.halls ?? []).map((hall) => {
        const free = hall.free_count > 0;
        const availability = exact
          ? free
            ? "Free at this time"
            : "Not free at this time"
          : free
            ? `${hall.free_count} free time${hall.free_count === 1 ? "" : "s"} on ${dayLabel(slot.day)}`
            : `No free time on ${dayLabel(slot.day)}`;
        return {
          ...hall,
          meta: [hall.capacity ? `${hall.capacity} seats` : null, hall.location, availability]
            .filter(Boolean)
            .join(" · "),
        };
      }),
    [data, exact, slot.day],
  );

  const placeholder = !payload
    ? "Set a time to see halls"
    : isLoading
      ? "Loading halls…"
      : error
        ? "Could not load halls"
        : halls.length === 0
          ? "No available hall"
          : "Choose a hall";

  return (
    <div className="jcs-hall d-flex flex-column gap-1">
      <span className="jcs-label">Hall</span>
      <CustomDropdown
        data={halls}
        displayKey={DISPLAY_KEY}
        valueKey={VALUE_KEY}
        value={slot.hall_id ?? null}
        isLoading={isLoading}
        placeholder={placeholder}
        optional
        dropdownWidth="24rem"
        onSelect={(selected, hall) => onSelect(selected.id, hall?.name ?? null)}
      />
      {error && (
        <span className="jcs-field-hint jcs-field-hint--danger">
          {describeError(error, "Could not load halls.")}
        </span>
      )}
      {!error && data?.data?.summary?.message && halls.length === 0 && (
        <span className="jcs-field-hint">{data.data.summary.message}</span>
      )}
    </div>
  );
}

export default HallSelect;

import { toMinutes } from "../semesterTimetable/timeUtils";

/*
 * Helpers for picking generated joint course slots. A proposal from the server
 * lists, per day, every free time with the halls free then; every time + hall
 * pair is an option with an option_id. The admin first selects a time, then a
 * hall for it. A pick is { key, day, day_label, start_time, end_time,
 * duration_minutes, halls, option_id, hall }, where option_id and hall stay
 * null until a hall is chosen. The server checks the same rules on confirm.
 */

// Matches the confirm endpoint (ConfirmJointCourseTimetableRequest).
export const MAX_PICKS = 20;

const overlaps = (a, b) =>
  toMinutes(a.start_time) < toMinutes(b.end_time) &&
  toMinutes(b.start_time) < toMinutes(a.end_time);

export const timeKey = (day, startTime) => `${day}|${startTime}`;

/** Select or unselect a time on a day. A new selection has no hall yet. */
export const toggleTime = (picks, day, time) => {
  const key = timeKey(day.day, time.start_time);
  if (picks.some((pick) => pick.key === key)) {
    return picks.filter((pick) => pick.key !== key);
  }
  return [
    ...picks,
    {
      key,
      day: day.day,
      day_label: day.day_label,
      start_time: time.start_time,
      end_time: time.end_time,
      duration_minutes: day.duration_minutes,
      halls: time.halls,
      option_id: null,
      hall: null,
    },
  ];
};

/** Choose the hall for a selected time; its option id is what gets saved. */
export const chooseHall = (picks, key, hall) =>
  picks.map((pick) => (pick.key === key ? { ...pick, option_id: hall.option_id, hall } : pick));

/** Selected times that still need a hall. */
export const picksWithoutHall = (picks) => picks.filter((pick) => !pick.option_id);

/** Why a time can't be selected right now, or null when it can. */
export const blockedReason = (picks, day, time) => {
  const clash = picks.find(
    (pick) => pick.day === day && pick.start_time !== time.start_time && overlaps(pick, time),
  );
  if (clash) return "Overlaps another slot you selected on this day";
  const selectedHere = picks.some((pick) => pick.day === day && pick.start_time === time.start_time);
  if (!selectedHere && picks.length >= MAX_PICKS) return `You can select up to ${MAX_PICKS} slots`;
  return null;
};

export const sortPicks = (picks, dayOrder) =>
  [...picks].sort(
    (a, b) =>
      dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day) ||
      toMinutes(a.start_time) - toMinutes(b.start_time),
  );

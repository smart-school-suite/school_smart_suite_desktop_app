import { toMinutes } from "../semesterTimetable/timeUtils";

/*
 * Helpers for picking generated joint course slots. A proposal from the server
 * lists, per day, every free time with the halls free then; every time + hall
 * pair is an option with an option_id. A pick is { option_id, day, start_time,
 * end_time, hall }. The server checks the same rules on confirm.
 */

// Matches the confirm endpoint (ConfirmJointCourseTimetableRequest).
export const MAX_PICKS = 20;

const overlaps = (a, b) =>
  toMinutes(a.start_time) < toMinutes(b.end_time) &&
  toMinutes(b.start_time) < toMinutes(a.end_time);

/** Every option in a proposal by id, with its day, time and hall. */
export const optionsById = (proposal) => {
  const byId = {};
  (proposal?.days ?? []).forEach((day) =>
    day.times.forEach((time) =>
      time.halls.forEach((hall) => {
        byId[hall.option_id] = {
          option_id: hall.option_id,
          day: day.day,
          day_label: day.day_label,
          start_time: time.start_time,
          end_time: time.end_time,
          duration_minutes: day.duration_minutes,
          hall,
        };
      }),
    ),
  );
  return byId;
};

/**
 * Toggle an option. Picking another hall at the same time swaps the hall;
 * a time that overlaps another pick on that day can't be picked.
 */
export const togglePick = (picks, option) => {
  if (picks.some((pick) => pick.option_id === option.option_id)) {
    return picks.filter((pick) => pick.option_id !== option.option_id);
  }
  const sameTime = picks.find(
    (pick) => pick.day === option.day && pick.start_time === option.start_time,
  );
  if (sameTime) {
    return picks.map((pick) => (pick === sameTime ? option : pick));
  }
  return [...picks, option];
};

/** Why a time can't be picked right now, or null when it can. */
export const blockedReason = (picks, day, time) => {
  const clash = picks.find(
    (pick) => pick.day === day && pick.start_time !== time.start_time && overlaps(pick, time),
  );
  if (clash) return "Overlaps another slot you picked on this day";
  const pickedHere = picks.some((pick) => pick.day === day && pick.start_time === time.start_time);
  if (!pickedHere && picks.length >= MAX_PICKS) return `You can pick up to ${MAX_PICKS} slots`;
  return null;
};

export const sortPicks = (picks, dayOrder) =>
  [...picks].sort(
    (a, b) =>
      dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day) ||
      toMinutes(a.start_time) - toMinutes(b.start_time),
  );

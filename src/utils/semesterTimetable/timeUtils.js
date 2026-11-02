import { daysOfWeek } from "../../data/data";

const TIME_PATTERN = /^([01]\d|2[0-3]):([0-5]\d)$/;

/** True when the value is a complete "HH:mm" string (masked inputs emit "08:__" while typing). */
export const isCompleteTime = (value) =>
  typeof value === "string" && TIME_PATTERN.test(value);

/** "HH:mm" -> minutes since midnight, or null when incomplete. */
export const toMinutes = (value) => {
  if (!isCompleteTime(value)) return null;
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
};

/** Minutes between two "HH:mm" values; null when either is incomplete or end <= start. */
export const minutesBetween = (start, end) => {
  const startMinutes = toMinutes(start);
  const endMinutes = toMinutes(end);
  if (startMinutes === null || endMinutes === null) return null;
  const diff = endMinutes - startMinutes;
  return diff > 0 ? diff : null;
};

/** True when both times are complete and end is after start. */
export const isValidRange = (start, end) => minutesBetween(start, end) !== null;

/** "13:30" -> "1:30 PM". Returns the fallback for incomplete values. */
export const formatTime = (value, fallback = "--:--") => {
  const total = toMinutes(value);
  if (total === null) return fallback;
  const hours24 = Math.floor(total / 60);
  const minutes = total % 60;
  const suffix = hours24 >= 12 ? "PM" : "AM";
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  return `${hours12}:${String(minutes).padStart(2, "0")} ${suffix}`;
};

/** 95 -> "1h 35m", 60 -> "1h", 45 -> "45m". */
export const formatDuration = (minutes, fallback = "—") => {
  if (minutes === null || minutes === undefined || Number.isNaN(minutes)) {
    return fallback;
  }
  if (minutes <= 0) return "0m";
  const hours = Math.floor(minutes / 60);
  const rest = Math.round(minutes % 60);
  if (hours && rest) return `${hours}h ${rest}m`;
  if (hours) return `${hours}h`;
  return `${rest}m`;
};

/** Hours with at most one decimal, e.g. 7.5. */
export const toHours = (minutes) =>
  minutes ? Math.round((minutes / 60) * 10) / 10 : 0;

const DAY_ORDER = daysOfWeek.map((day) => day.value);

/** Sort day keys ("monday", ...) in calendar order without mutating the input. */
export const sortDays = (days = []) =>
  [...days].sort(
    (a, b) =>
      DAY_ORDER.indexOf(String(a).toLowerCase()) -
      DAY_ORDER.indexOf(String(b).toLowerCase()),
  );

export const dayLabel = (day) =>
  daysOfWeek.find((item) => item.value === String(day).toLowerCase())?.label ??
  String(day);

export const dayShortLabel = (day) => dayLabel(day).slice(0, 3);

/**
 * Days a constraint may target: the configured operational days, or the full
 * week when no operational days have been set yet.
 */
export const resolveScheduleDays = (operationalDays = []) =>
  operationalDays.length ? sortDays(operationalDays) : DAY_ORDER;

/** Minutes since midnight -> "HH:mm" (wraps past midnight). */
export const fromMinutes = (total) => {
  const wrapped = ((Math.round(total) % 1440) + 1440) % 1440;
  return `${String(Math.floor(wrapped / 60)).padStart(2, "0")}:${String(wrapped % 60).padStart(2, "0")}`;
};

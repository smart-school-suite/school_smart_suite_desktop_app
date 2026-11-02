import { minutesBetween } from "./timeUtils";

/** Opening and closing time for a day, honouring operational exceptions. */
export const resolveOperatingWindow = (operationalPeriod, day) => {
  const exception = operationalPeriod.day_exceptions.find(
    (item) => item.day === day,
  );
  const source = exception ?? operationalPeriod;
  return minutesBetween(source.start_time?.value, source.end_time?.value);
};

/** Break minutes for a day, honouring no-break and custom-break days. */
export const resolveBreakMinutes = (breakPeriod, day) => {
  if (breakPeriod.no_break_exceptions.includes(day)) return 0;
  const custom = breakPeriod.day_exceptions.find((item) => item.day === day);
  const source = custom ?? breakPeriod;
  return minutesBetween(source.start_time?.value, source.end_time?.value) ?? 0;
};

/**
 * Approximate number of teaching periods that fit in a day, or null when the
 * operating hours or duration are unknown.
 */
export const estimatePeriodsForDay = ({
  operationalPeriod,
  breakPeriod,
  day,
  durationMinutes,
}) => {
  const window = resolveOperatingWindow(operationalPeriod, day);
  if (!window || !durationMinutes) return null;
  const teaching = Math.max(0, window - resolveBreakMinutes(breakPeriod, day));
  return Math.floor(teaching / durationMinutes);
};

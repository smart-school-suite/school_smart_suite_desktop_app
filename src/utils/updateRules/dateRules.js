import { formatScheduleDate as human } from "../feeSchedule/scheduleRules";

/**
 * Client-side helpers for the API's update rules (the update-rules endpoints
 * of academic years, semesters and exams). For each date the API sends every limit
 * as { date, reason, kind }. The form recomputes:
 *  - "pair" limits (start before end) from the dates being entered, and
 *  - limits of the kind given in `replace` (e.g. "system_year") when the
 *    record they depend on is changed in the form.
 * The API re-checks everything on save.
 */

const shiftDate = (date, days) => {
  const d = new Date(`${date}T00:00:00`);
  d.setDate(d.getDate() + days);
  return [d.getFullYear(), String(d.getMonth() + 1).padStart(2, "0"), String(d.getDate()).padStart(2, "0")].join("-");
};

/**
 * The range a date may take, with the reason for each end.
 *   fieldName: "start_date" | "end_date"
 *   field: rules.fields[fieldName]
 *   start, end: the dates as currently entered
 *   replace: optional { kind, min, max } limits replacing those of that kind
 *   sameDay: true when start and end may be the same day (exams)
 */
export function boundsFor(fieldName, field, { start, end, replace, sameDay = false } = {}) {
  const keep = (list = []) => list.filter((limit) => limit.kind !== "pair" && (!replace || limit.kind !== replace.kind));
  const min = keep(field?.limits?.min);
  const max = keep(field?.limits?.max);

  if (replace?.min) min.push(replace.min);
  if (replace?.max) max.push(replace.max);
  const gap = sameDay ? 0 : 1;
  if (fieldName === "start_date" && end)
    max.push({ date: shiftDate(end, -gap), reason: sameDay ? "it must be on or before the end date" : "it must be before the end date" });
  if (fieldName === "end_date" && start)
    min.push({ date: shiftDate(start, gap), reason: sameDay ? "it must be on or after the start date" : "it must be after the start date" });

  const tightestMin = min.sort((a, b) => (a.date < b.date ? 1 : -1))[0] ?? null;
  const tightestMax = max.sort((a, b) => (a.date > b.date ? 1 : -1))[0] ?? null;
  return { min: tightestMin, max: tightestMax };
}

/** A message when the value breaks the range, else null. */
export function dateError(label, value, bounds) {
  if (!value) return `Pick ${/^[aeiou]/i.test(label) ? "an" : "a"} ${label}.`;
  // DateInput is masked, so partly typed dates arrive as e.g. "2027-0_-__".
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return `Enter the full ${label} (YYYY-MM-DD).`;
  if (bounds.min && bounds.max && bounds.min.date > bounds.max.date)
    return `No ${label} fits: ${bounds.min.reason}, but ${bounds.max.reason}.`;
  if (bounds.min && value < bounds.min.date) return `Must be on or after ${human(bounds.min.date)}: ${bounds.min.reason}.`;
  if (bounds.max && value > bounds.max.date) return `Must be on or before ${human(bounds.max.date)}: ${bounds.max.reason}.`;
  return null;
}

/** "between 1 May 2027 and 31 Aug 2027", "from …", "until …", or null. */
export const rangeHint = (bounds) =>
  bounds.min && bounds.max
    ? `between ${human(bounds.min.date)} and ${human(bounds.max.date)}`
    : bounds.min
      ? `from ${human(bounds.min.date)}`
      : bounds.max
        ? `until ${human(bounds.max.date)}`
        : null;

import { formatScheduleDate as human } from "../feeSchedule/scheduleRules";

/**
 * Client-side mirror of the API's academic year update rules
 * (SchoolAcademicYearUpdatePolicy). The API sends every limit on each date
 * with its reason; limits of kind "system_year" depend on the selected school
 * year, so they are recomputed when the user picks another one. The API
 * re-checks everything on save.
 */

const shiftDate = (date, days) => {
  const d = new Date(`${date}T00:00:00`);
  d.setDate(d.getDate() + days);
  return [d.getFullYear(), String(d.getMonth() + 1).padStart(2, "0"), String(d.getDate()).padStart(2, "0")].join("-");
};

const systemYearLimits = (systemYear) =>
  systemYear
    ? {
        min: { date: `${systemYear.year_start}-01-01`, reason: `it must fall within ${systemYear.name}`, kind: "system_year" },
        max: { date: `${systemYear.year_end}-12-31`, reason: `it must fall within ${systemYear.name}`, kind: "system_year" },
      }
    : null;

/**
 * The range a date may take, with the reason for each end.
 *   field: rules.fields.start_date | end_date
 *   other: { start_date, end_date } as currently entered
 */
export function boundsFor(fieldName, field, { systemYear, start, end }) {
  const replace = systemYearLimits(systemYear);
  // School year and start/end pairing limits are recomputed from the form.
  const keep = (list = []) => list.filter((limit) => limit.kind !== "system_year" && limit.kind !== "pair");
  const min = keep(field?.limits?.min);
  const max = keep(field?.limits?.max);

  if (replace) {
    min.push(replace.min);
    max.push(replace.max);
  }
  // The pairing limit follows what is entered in the other date.
  if (fieldName === "start_date" && end) max.push({ date: shiftDate(end, -1), reason: "it must be before the end date" });
  if (fieldName === "end_date" && start) min.push({ date: shiftDate(start, 1), reason: "it must be after the start date" });

  const tightestMin = min.sort((a, b) => (a.date < b.date ? 1 : -1))[0] ?? null;
  const tightestMax = max.sort((a, b) => (a.date > b.date ? 1 : -1))[0] ?? null;
  return { min: tightestMin, max: tightestMax };
}

/** A message when the value breaks the range, else null. */

export function dateError(label, value, bounds) {
  if (!value) return `Pick a ${label}.`;
  if (bounds.min && bounds.max && bounds.min.date > bounds.max.date)
    return `No ${label} fits: ${bounds.min.reason}, but ${bounds.max.reason}.`;
  if (bounds.min && value < bounds.min.date) return `Must be on or after ${human(bounds.min.date)}: ${bounds.min.reason}.`;
  if (bounds.max && value > bounds.max.date) return `Must be on or before ${human(bounds.max.date)}: ${bounds.max.reason}.`;
  return null;
}

/** Human labels for the fields, used in the "can't change" list. */
export const FIELD_LABELS = {
  specialty_id: "Specialty",
  system_academic_year_id: "School year",
  start_date: "Start date",
  end_date: "End date",
};

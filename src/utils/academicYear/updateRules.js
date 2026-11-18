/** Academic-year specifics for the shared update-rule helpers (utils/updateRules/dateRules). */

/** Limits a school year (e.g. 2026/2027) puts on the dates, replacing the API's "system_year" ones. */
export const systemYearLimits = (systemYear) =>
  systemYear
    ? {
        kind: "system_year",
        min: { date: `${systemYear.year_start}-01-01`, reason: `it must fall within ${systemYear.name}`, kind: "system_year" },
        max: { date: `${systemYear.year_end}-12-31`, reason: `it must fall within ${systemYear.name}`, kind: "system_year" },
      }
    : null;

/** Human labels for the fields, used in the "can't change" list. */
export const FIELD_LABELS = {
  specialty_id: "Specialty",
  system_academic_year_id: "School year",
  start_date: "Start date",
  end_date: "End date",
};

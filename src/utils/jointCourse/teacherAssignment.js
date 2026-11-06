/*
 * Display helpers for the joint course teacher assignment drawer.
 */

// No school setting defines a workload limit yet. This only drives an advisory
// warning; it never blocks an assignment. Replace with the setting once one exists.
export const HIGH_WORKLOAD_COURSE_COUNT = 6;

export const initials = (teacher) =>
  [teacher?.first_name, teacher?.last_name]
    .filter(Boolean)
    .map((part) => part[0].toUpperCase())
    .join("") ||
  teacher?.name?.slice(0, 2).toUpperCase() ||
  "?";

export const NO_QUALIFICATION = "No qualification on record";

/** "Doctor of Philosophy · Computer Science" */
export const qualificationLabel = (qualification) =>
  [qualification.name, qualification.field_of_study].filter(Boolean).join(" · ");

/** One line per qualification, for tooltips. */
export const qualificationsTitle = (qualifications = []) =>
  qualifications.length
    ? qualifications
        .map((qualification) =>
          [qualificationLabel(qualification), qualification.institution, qualification.year]
            .filter(Boolean)
            .join(", "),
        )
        .join("\n")
    : NO_QUALIFICATION;

export const workloadLabel = (count) => `${count} course${count === 1 ? "" : "s"}`;

export const isHighWorkload = (count) => count >= HIGH_WORKLOAD_COURSE_COUNT;

/** Search by name or username (the closest thing to a staff ID the API has). */
export const matchesTeacher = (teacher, query) => {
  if (!query) return true;
  const haystack = [teacher.name, teacher.username].filter(Boolean).join(" ").toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
};

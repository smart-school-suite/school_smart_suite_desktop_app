/**
 * Helpers for the create exam drawer, over GET exam/creation-options.
 * The API decides what can be created (ExamCreationPolicy) and re-checks
 * on save; these only search and label what it sends.
 */

export const SEMESTER_STATUS = {
  ongoing: { label: "Ongoing", tone: "success", pulse: true },
  upcoming: { label: "Upcoming", tone: "primary" },
  ended: { label: "Ended", tone: "neutral" },
};

export const USAGE_LABEL = {
  unused: "No exams yet",
  partial: "Partly created",
  complete: "All exams created",
};

const searchableText = (semester) =>
  [
    semester?.name,
    semester?.academic_year?.name,
    semester?.academic_year?.specialty,
    semester?.academic_year?.level,
    ...(semester?.exam_types ?? []).map((type) => type?.name),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

/** Every word of the query must appear in the semester, its academic year or its exam types. */
export const filterSemesters = (semesters, query) => {
  const list = Array.isArray(semesters) ? semesters : [];
  const terms = String(query ?? "").toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return list;
  return list.filter((semester) => {
    const text = searchableText(semester);
    return terms.every((term) => text.includes(term));
  });
};

/** The semester's exam type to preselect: the recommended one, else the first that can be created. */
export const suggestedExamType = (semester) => {
  const types = Array.isArray(semester?.exam_types) ? semester.exam_types : [];
  return types.find((type) => type.recommended) ?? types.find((type) => type.available) ?? null;
};

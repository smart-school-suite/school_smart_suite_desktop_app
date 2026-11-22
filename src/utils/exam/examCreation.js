/**
 * Helpers for the create exam drawer, over GET exam/creation-options.
 * The API decides what can be created (ExamCreationPolicy) and re-checks
 * on save; these only search and label what it sends.
 */

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

/**
 * Buttons for the API's issue and finding `action` codes. `path` opens a
 * page (the drawer closes first); create_ca is handled in the exam type step.
 */
export const ISSUE_ACTIONS = {
  add_students: { label: "Add students", path: "/students" },
  manage_semesters: { label: "Go to semesters", path: "/semesters" },
  create_academic_year: { label: "Go to academic years", path: "/academic-year" },
  view_exams: { label: "View exams", path: "/exam" },
};

/**
 * A failed options request in plain words. A 404 means the API doesn't
 * have the endpoint yet (it is older than this app), not that something
 * of the school's is missing.
 */
export const describeOptionsError = (error) => {
  if (error?.response?.status === 404) {
    return {
      title: "Creating exams by semester isn't available yet",
      description:
        "The server is running an older version that can't list semesters for new exams. Ask your administrator to update it, then try again.",
    };
  }
  return null;
};

// Helpers for the exam invigilator page (pages/Exam/ExamInvigilator.jsx).

export const EXAM_STATUSES = ["active", "upcoming", "finished"];

const terms = (query) =>
  (query ?? "").trim().toLowerCase().split(/\s+/).filter(Boolean);

const matchesAll = (values, query) => {
  const words = terms(query);
  if (words.length === 0) return true;
  const haystack = values.filter(Boolean).join(" ").toLowerCase();
  return words.every((word) => haystack.includes(word));
};

export const examMatches = (exam, query) =>
  matchesAll(
    [
      exam?.exam_name,
      exam?.specialty_name,
      exam?.level_name,
      exam?.exam_type,
      exam?.semester_name,
      exam?.school_year,
      exam?.status,
    ],
    query,
  );

export const invigilatorMatches = (invigilator, query) =>
  matchesAll(
    [
      invigilator?.name,
      invigilator?.username,
      invigilator?.email,
      invigilator?.phone,
      invigilator?.actorable_type?.replaceAll("_", " "),
    ],
    query,
  );

/**
 * Academic year → semester → exams, newest academic year first.
 * Returns [{ school_year, total, semesters: [{ semester, exams }] }].
 */
export function groupExamsByYearAndSemester(exams) {
  const years = new Map();
  for (const exam of exams ?? []) {
    const year = exam?.school_year || "Unknown academic year";
    const semester = exam?.semester_name || "No semester";
    if (!years.has(year)) years.set(year, new Map());
    const semesters = years.get(year);
    if (!semesters.has(semester)) semesters.set(semester, []);
    semesters.get(semester).push(exam);
  }
  return [...years.entries()]
    .map(([school_year, semesters]) => ({
      school_year,
      total: [...semesters.values()].reduce((sum, list) => sum + list.length, 0),
      semesters: [...semesters.entries()].map(([semester, list]) => ({
        semester,
        exams: list,
      })),
    }))
    .sort((a, b) => b.school_year.localeCompare(a.school_year));
}

// Assigned invigilators come back as { teachers: [...], school_admins: [...] }
// with empty groups left out.
export const INVIGILATOR_GROUPS = [
  { key: "teachers", label: "Teachers" },
  { key: "school_admins", label: "School admins" },
];

export function groupInvigilators(data, query) {
  const source = data && typeof data === "object" ? data : {};
  const known = INVIGILATOR_GROUPS.map((group) => group.key);
  const extra = Object.keys(source)
    .filter((key) => !known.includes(key))
    .map((key) => ({ key, label: key.replaceAll("_", " ") }));
  return [...INVIGILATOR_GROUPS, ...extra]
    .map((group) => {
      const all = Array.isArray(source[group.key]) ? source[group.key] : [];
      return {
        ...group,
        total: all.length,
        items: all.filter((item) => invigilatorMatches(item, query)),
      };
    })
    .filter((group) => group.total > 0);
}

export const formatExamDate = (value) => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

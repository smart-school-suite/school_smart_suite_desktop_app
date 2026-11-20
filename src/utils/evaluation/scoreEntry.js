import { RESULT } from "@/constants";

/**
 * Helpers shared by the CA, exam and resit score dialogs and their slices.
 *
 * Helper endpoints can return partial data (a course that was deleted, a
 * grade scale entry without a letter grade, numbers as strings), so every
 * mapper here accepts anything and never throws.
 */

export const toList = (value) => (Array.isArray(value) ? value : []);

export const toNumber = (value, fallback = 0) => {
  const number = typeof value === "number" ? value : parseFloat(value);
  return Number.isFinite(number) ? number : fallback;
};

export const isBlankScore = (value) =>
  value === "" || value === null || value === undefined;

/** A stored score for an input: a number, or "" when there is none. */
export const toScoreInput = (value) => {
  if (isBlankScore(value)) return "";
  const number = toNumber(value, NaN);
  return Number.isNaN(number) ? "" : number;
};

/** The score as typed: "" stays blank, anything else is kept as typed. */
export const isEnteredScore = (value) =>
  !isBlankScore(value) && Number.isFinite(toNumber(value, NaN));

export const mapGradeScale = (gradeScale) =>
  toList(gradeScale)
    .filter((entry) => entry && typeof entry === "object")
    .map((entry) => ({
      scale_id: entry.id,
      gradePoints: toNumber(entry.grade_points),
      result: entry.result ?? null,
      maximumScore: toNumber(entry.maximum_score, NaN),
      minimumScore: toNumber(entry.minimum_score, NaN),
      performance: entry.performance ?? null,
      resitResult: entry.resit_result ?? null,
      grade: entry.grade?.letter_grade ?? (typeof entry.grade === "string" ? entry.grade : null),
    }))
    .filter(
      (entry) =>
        Number.isFinite(entry.minimumScore) && Number.isFinite(entry.maximumScore),
    );

/** The grade scale entry a total falls in, or null. */
export const findGrade = (gradeScale, total) => {
  if (!Number.isFinite(total)) return null;
  return (
    toList(gradeScale).find(
      (entry) => total >= entry.minimumScore && total <= entry.maximumScore,
    ) ?? null
  );
};

const NOT_GRADED = {
  gradePoints: 0,
  result: "N/A",
  resitResult: "N/A",
  performance: "N/A",
  grade: "N/A",
};

/** The grade fields of a course for a total score (blank or out of scale: not graded). */
export const gradeFields = (gradeScale, total) => {
  const grade = findGrade(gradeScale, total);
  if (!grade) return { ...NOT_GRADED };
  return {
    gradePoints: grade.gradePoints,
    result: grade.result ?? "N/A",
    resitResult: grade.resitResult ?? "N/A",
    performance: grade.performance ?? "N/A",
    grade: grade.grade ?? "N/A",
  };
};

/**
 * Summary of the scores entered so far. The result stays "NA" until every
 * course has a score, so a half-filled form never reads as "Passed".
 */
export const summariseScores = (scores) => {
  const list = toList(scores);
  let coursesPassed = 0;
  let coursesFailed = 0;
  let resits = 0;
  let totalGradePoints = 0;
  let entered = 0;

  list.forEach((course) => {
    if (isEnteredScore(course?.score)) entered++;
    const status = String(course?.result ?? "").toLowerCase();
    if (status === RESULT.PASSED || status === "pass") coursesPassed++;
    else if (status === RESULT.FAILED || status === "fail") coursesFailed++;
    if (String(course?.resitResult ?? "").toLowerCase() === "resit") resits++;
    totalGradePoints += toNumber(course?.gradePoints);
  });

  const gpa = list.length > 0 ? totalGradePoints / list.length : 0;
  const complete = list.length > 0 && entered === list.length;
  const examStatus = !complete
    ? "NA"
    : coursesFailed > 0
      ? RESULT.FAILED
      : RESULT.PASSED;

  return { coursesPassed, coursesFailed, resits, totalGradePoints, gpa, examStatus };
};

export const scoresChanged = (draftScores, initialScores) => {
  const draft = toList(draftScores);
  const initial = toList(initialScores);
  if (draft.length !== initial.length) return true;
  return draft.some((course) => {
    const original = initial.find((item) => item.id === course.id);
    return !original || String(course.score) !== String(original.score);
  });
};

/**
 * Why a score can't be saved, or null. Mirrors the API rules: required,
 * a number, not negative, at most 2 decimals, and within the maximum.
 */
export const scoreError = (value, max) => {
  if (isBlankScore(value)) return "Enter a score";
  const text = String(value).trim();
  const number = Number(text);
  if (text === "" || !Number.isFinite(number)) return "Enter a number";
  if (number < 0) return "Can't be negative";
  if (!/^\d+(\.\d{1,2})?$/.test(text)) return "Use at most 2 decimals";
  if (Number.isFinite(max) && max > 0 && number > max) return `Can't be more than ${max}`;
  return null;
};

/** { [key]: message } for every score that can't be saved. */
export const scoreErrors = (scores, max, keyOf) =>
  toList(scores).reduce((errors, course, index) => {
    const message = scoreError(course?.score, max);
    if (message) errors[keyOf(course, index)] = message;
    return errors;
  }, {});

/** Every word of the query must appear in the course title or code. */
export const filterCourses = (scores, query) => {
  const list = toList(scores);
  const terms = String(query ?? "").toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return list;
  return list.filter((course) => {
    const text = `${course?.course_title ?? ""} ${course?.course_code ?? ""}`.toLowerCase();
    return terms.every((term) => text.includes(term));
  });
};

/**
 * Query options for the score dialogs' helper data:
 * - fresh data every time a dialog opens (scores may have changed elsewhere);
 * - no refetch on window focus, which would reset what is being typed;
 * - a 4xx answer (grade scale not set, no CA marks, ...) is final, so only
 *   connection and server errors are retried, once.
 */
export const EVALUATION_HELPER_QUERY = Object.freeze({
  staleTime: 0,
  refetchOnMount: "always",
  refetchOnWindowFocus: false,
  retry: (failureCount, error) => {
    const status = error?.response?.status;
    return !(status >= 400 && status < 500) && failureCount < 1;
  },
});

/**
 * Exam score limits: the exam score is out of what the CA leaves
 * (exam max − CA max); the final score (CA + exam) is out of the exam max.
 */
export const examScoreLimits = (maxScore, caMaxScore) => {
  const totalMax = toNumber(maxScore);
  const caMax = toNumber(caMaxScore);
  const examMax = totalMax - caMax;
  return { totalMax, caMax, inputMax: examMax > 0 ? examMax : totalMax };
};

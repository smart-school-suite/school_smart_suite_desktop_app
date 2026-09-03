import { v4 as uuidv4 } from "uuid";
const hasGradeScaleChanges = (initialConfig, draft) => {
  if (!initialConfig || !draft) {
    return false;
  }

  if (initialConfig.maximumScore !== draft.maximumScore) {
    return true;
  }

  const initialGrades = initialConfig.grades ?? {};
  const draftGrades = draft.grades ?? {};

  const initialGradeIds = Object.keys(initialGrades);
  const draftGradeIds = Object.keys(draftGrades);

  if (initialGradeIds.length !== draftGradeIds.length) {
    return true;
  }

  for (const gradeId of draftGradeIds) {
    const initialGrade = initialGrades[gradeId];
    const draftGrade = draftGrades[gradeId];

    if (!initialGrade || !draftGrade) {
      return true;
    }

    const fields = [
      "min_score",
      "max_score",
      "grade_point",
      "performance",
      "result",
      "resit_result",
    ];

    for (const field of fields) {
      const initialValue = initialGrade[field]?.value ?? null;
      const draftValue = draftGrade[field]?.value ?? null;

      if (initialValue !== draftValue) {
        return true;
      }
    }
  }

  return false;
};
const validateGradeRanges = (grades, maximumScore) => {
  const conflicts = [];
  const warnings = [];

  const gradeEntries = Object.values(grades);

  for (let i = 0; i < gradeEntries.length; i++) {
    const grade = gradeEntries[i];

    const min = Number(grade.min_score?.value);
    const max = Number(grade.max_score?.value);

    if (
      grade.min_score?.value === "" ||
      grade.max_score?.value === "" ||
      grade.min_score?.value === null ||
      grade.max_score?.value === null
    ) {
      continue;
    }

    if (min > max) {
      conflicts.push({
        id: uuidv4(),
        type: "invalid_grade_range",
        grade_ids: [grade.letter_grade_id]
      });
    }

    if (min < 0 || max < 0) {
      conflicts.push({
        id: uuidv4(),
        type: "negative_score",
        grade_ids: [grade.letter_grade_id]
      });
    }

    if (
      maximumScore !== "" &&
      maximumScore !== null &&
      (min > Number(maximumScore) || max > Number(maximumScore))
    ) {
      conflicts.push({
        id: uuidv4(),
        type: "score_exceeds_maximum",
        grade_ids: [grade.letter_grade_id]
      });
    }

    for (let j = i + 1; j < gradeEntries.length; j++) {
      const otherGrade = gradeEntries[j];

      const otherMin = Number(otherGrade.min_score?.value);
      const otherMax = Number(otherGrade.max_score?.value);

      if (
        otherGrade.min_score?.value === "" ||
        otherGrade.max_score?.value === "" ||
        otherGrade.min_score?.value === null ||
        otherGrade.max_score?.value === null
      ) {
        continue;
      }

      const overlaps = min <= otherMax && max >= otherMin;

      if (overlaps) {
        conflicts.push({
          id:  uuidv4(),
          type: "grade_range_overlap",
          grade_ids: [grade.letter_grade_id, otherGrade.letter_grade_id],
        });
      }
    }
  }

  return {
    isValid: conflicts.length === 0,
    conflicts,
    warnings
  };
};

function isConflicting(id, conflictsArray) {
  // Filter for grade_range_overlap type conflicts
  const gradeRangeOverlaps = conflictsArray.filter(
    item => item.type === "grade_range_overlap"
  );

  // Check if any conflict's grade_ids array includes the given id
  for (const conflict of gradeRangeOverlaps) {
    if (conflict.grade_ids && conflict.grade_ids.includes(id)) {
      return true;
    }
  }

  return false;
}

export { hasGradeScaleChanges, validateGradeRanges, isConflicting };

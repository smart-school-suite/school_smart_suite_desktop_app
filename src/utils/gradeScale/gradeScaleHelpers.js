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
const validateGradeScale = (grades, maximumScore) => {
  const conflicts = [];
  const warnings = [];

  const gradeEntries = Object.values(grades);

  for (let i = 0; i < gradeEntries.length; i++) {
    const grade = gradeEntries[i];

    const gradeId = grade.letter_grade_id;

    const minValue = grade.min_score?.value;
    const maxValue = grade.max_score?.value;

    const hasMin = minValue !== "" && minValue !== null;
    const hasMax = maxValue !== "" && maxValue !== null;

    const min = parseFloat(minValue);
    const max = parseFloat(maxValue);

    if (hasMin && hasMax) {
      if (min > max) {
        conflicts.push({
          id: uuidv4(),
          type: "invalid_grade_range",
          grade_ids: [gradeId],
        });
      }

      if (min < 0 || max < 0) {
        conflicts.push({
          id: uuidv4(),
          type: "negative_score",
          grade_ids: [gradeId],
        });
      }

      if (
        maximumScore !== "" &&
        maximumScore !== null &&
        (min > parseFloat(maximumScore) || max > parseFloat(maximumScore))
      ) {
        conflicts.push({
          id: uuidv4(),
          type: "score_exceeds_maximum",
          grade_ids: [gradeId],
        });
      }
    }

    if (hasMin && hasMax) {
      for (let j = i + 1; j < gradeEntries.length; j++) {
        const otherGrade = gradeEntries[j];

        const otherMinValue = otherGrade.min_score?.value;
        const otherMaxValue = otherGrade.max_score?.value;

        const hasOtherMin = otherMinValue !== "" && otherMinValue !== null;

        const hasOtherMax = otherMaxValue !== "" && otherMaxValue !== null;

        if (!hasOtherMin || !hasOtherMax) {
          continue;
        }

        const otherMin = parseFloat(otherMinValue);
        const otherMax = parseFloat(otherMaxValue);

        const overlaps = min <= otherMax && max >= otherMin;

        if (overlaps) {
          conflicts.push({
            id: uuidv4(),
            type: "grade_range_overlap",
            grade_ids: [gradeId, otherGrade.letter_grade_id],
          });
        }
      }
    }

    const performance = grade.performance?.value;

    if (performance !== null && performance !== "") {
      for (let j = i + 1; j < gradeEntries.length; j++) {
        const otherGrade = gradeEntries[j];

        const otherPerformance = otherGrade.performance?.value;

        if (otherPerformance === null || otherPerformance === "") {
          continue;
        }

        const samePerformance =
          performance.trim().toLowerCase() ==
          otherPerformance.trim().toLowerCase();

        if (samePerformance) {
          warnings.push({
            id: uuidv4(),
            type: "duplicate_performance",
            grade_ids: [gradeId, otherGrade.letter_grade_id],
          });
        }
      }
    }
  }

  return {
    isValid: conflicts.length === 0,
    conflicts,
    warnings,
  };
};

function isError(id, conflictsArray) {
  for (const conflict of conflictsArray) {
    if (conflict.grade_ids && conflict.grade_ids.includes(id)) {
      return true;
    }
  }
  return false;
}

function isWarning(id, conflictsArray) {
  for (const conflict of conflictsArray) {
    if (conflict.grade_ids && conflict.grade_ids.includes(id)) {
      return true;
    }
  }
  return false;
}

function isConflicting(id, conflictsArray) {
  // Filter for grade_range_overlap type conflicts
  const gradeRangeOverlaps = conflictsArray.filter(
    (item) => item.type === "grade_range_overlap",
  );

  // Check if any conflict's grade_ids array includes the given id
  for (const conflict of gradeRangeOverlaps) {
    if (conflict.grade_ids && conflict.grade_ids.includes(id)) {
      return true;
    }
  }

  return false;
}

function groupGradeScaleErrors(id, conflictsArray, warningsArray) {
  const conflicts = [];
  const warnings = [];

  for (const conflict of conflictsArray) {
    if (conflict.grade_ids && conflict.grade_ids.includes(id)) {
      conflicts.push(conflict);
    }
  }

  for (const warning of warningsArray) {
    if (warning.grade_ids && warning.grade_ids.includes(id)) {
      warnings.push(warning);
    }
  }

  return { conflicts, warnings };
}
export {
  hasGradeScaleChanges,
  validateGradeScale,
  isConflicting,
  isError,
  isWarning,
  groupGradeScaleErrors,
};

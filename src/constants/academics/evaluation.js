export const RESULT = Object.freeze({
  PASSED: "passed",
  FAILED: "failed",
});

export const RESULT_LABEL = Object.freeze({
  [RESULT.PASSED]: "Passed",
  [RESULT.FAILED]: "Failed",
});

export const RESULT_META = Object.freeze({
  [RESULT.PASSED]: {
    label: RESULT_LABEL[RESULT.PASSED],
    description: "Student has met or exceeded the passing requirements",
    useCase: "Course completion and credit award",
  },
  [RESULT.FAILED]: {
    label: RESULT_LABEL[RESULT.FAILED],
    description: "Student did not meet the minimum required passing score",
    useCase: "Academic review, course repetition, or resit eligibility",
  },
});

export const DEFAULT_RESULT = RESULT.PASSED;
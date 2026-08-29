export const EXAM_TYPE = Object.freeze({
  EXAM: "exam",
  RESIT: "resit",
  CA: "ca",
});

export const EXAM_TYPE_LABEL = Object.freeze({
  [EXAM_TYPE.EXAM]: "Exam",
  [EXAM_TYPE.RESIT]: "Resit",
  [EXAM_TYPE.CA]: "Continuous Assessment",
});

export const EXAM_TYPE_META = Object.freeze({
  [EXAM_TYPE.EXAM]: {
    label: EXAM_TYPE_LABEL[EXAM_TYPE.EXAM],
    description: "Standard end-of-term or final course examination",
    useCase: "Main summative evaluation for final grade calculation",
  },
  [EXAM_TYPE.RESIT]: {
    label: EXAM_TYPE_LABEL[EXAM_TYPE.RESIT],
    description: "Retake examination for students who failed or missed the main exam",
    useCase: "Secondary evaluation attempt for grade recovery",
  },
  [EXAM_TYPE.CA]: {
    label: EXAM_TYPE_LABEL[EXAM_TYPE.CA],
    description: "Ongoing evaluations throughout the course (quizzes, assignments, projects)",
    useCase: "Formative tracking and internal coursework score accumulation",
  },
});

export const DEFAULT_EXAM_TYPE = EXAM_TYPE.EXAM;
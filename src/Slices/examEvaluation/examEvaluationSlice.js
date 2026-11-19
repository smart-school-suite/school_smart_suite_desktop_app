import { createScoreEntrySlice } from "./createScoreEntrySlice";

// Exam scores: the grade is looked up with CA score + exam score.
const examEvaluationSlice = createScoreEntrySlice({
  name: "examEvaluation",
  resetName: "resetExamScoreState",
  defaultMaxScore: 70,
  defaultCaMaxScore: 30,
  // An entry of the helper's ca_scores: { score, course: { id, ... } }
  mapCourse: (caScore) => ({
    key: caScore?.course?.id ?? caScore?.course_id,
    course_id: caScore?.course?.id ?? caScore?.course_id,
    course_title: caScore?.course?.course_title ?? null,
    course_code: caScore?.course?.course_code ?? null,
    course_credit: caScore?.course?.credit ?? null,
    caScore: parseFloat(caScore?.score) || 0,
  }),
});

export const {
  setUpdateInitialData,
  setInitialData,
  updateScore,
  updateDraftScore,
  resetUpdateState,
  resetExamScoreState,
} = examEvaluationSlice.actions;

export default examEvaluationSlice.reducer;

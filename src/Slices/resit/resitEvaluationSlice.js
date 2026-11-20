import { createScoreEntrySlice } from "../examEvaluation/createScoreEntrySlice";

const resitEvaluationSlice = createScoreEntrySlice({
  name: "resitEvaluation",
  resetName: "resetResitScoreState",
  // An entry of the helper's courses: { resit_id, course_id, course_title, ... }.
  // Keyed by resit: a student can resit the same course from two exams.
  mapCourse: (resit) => ({
    key: resit?.resit_id,
    resit_id: resit?.resit_id,
    course_id: resit?.course_id ?? null,
    course_title: resit?.course_title ?? null,
    course_code: resit?.course_code ?? null,
    course_credit: resit?.course_credit ?? resit?.credit ?? null,
  }),
});

export const {
  setUpdateInitialData,
  setInitialData,
  updateScore,
  updateDraftScore,
  resetUpdateState,
  resetResitScoreState,
} = resitEvaluationSlice.actions;

export default resitEvaluationSlice.reducer;

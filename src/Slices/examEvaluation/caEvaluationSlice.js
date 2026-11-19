import { createScoreEntrySlice } from "./createScoreEntrySlice";

const caEvaluationSlice = createScoreEntrySlice({
  name: "caEvaluation",
  resetName: "resetCaScoreState",
  // An entry of the helper's courses: a course { id, course_title, ... }
  mapCourse: (course) => ({
    key: course?.id,
    course_id: course?.id,
    course_title: course?.course_title ?? null,
    course_code: course?.course_code ?? null,
    course_credit: course?.credit ?? null,
  }),
});

export const {
  setUpdateInitialData,
  setInitialData,
  updateScore,
  updateDraftScore,
  resetUpdateState,
  resetCaScoreState,
} = caEvaluationSlice.actions;

export default caEvaluationSlice.reducer;

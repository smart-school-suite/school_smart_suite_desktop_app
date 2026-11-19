import { createSlice } from "@reduxjs/toolkit";
import {
  gradeFields,
  mapGradeScale,
  scoresChanged,
  summariseScores,
  toList,
  toNumber,
  toScoreInput,
} from "../../utils/evaluation/scoreEntry";

const emptySummary = () => summariseScores([]);

const emptyState = () => ({
  scores: [],
  gradeScale: [],
  resultSummary: emptySummary(),
  maxGpa: 0,
  maxScore: 0,
  caMaxScore: 0,
  update: {
    maxGpa: 0,
    maxScore: 0,
    caMaxScore: 0,
    isDirty: false,
    gradeScale: [],
    initial: { scores: [], resultSummary: emptySummary() },
    draft: { scores: [], resultSummary: emptySummary() },
  },
});

/** The score the grade is looked up with: the CA score is added for exams. */
const totalOf = (course) =>
  course.score === "" ? NaN : toNumber(course.caScore) + toNumber(course.score);

const regrade = (course, gradeScale) =>
  Object.assign(course, gradeFields(gradeScale, totalOf(course)));

/** A score from the update helper (same shape for CA, exam and resit). */
const mapStoredScore = (score) => ({
  key: score?.id,
  id: score?.id,
  course_id: score?.course_id ?? null,
  course_title: score?.course_title ?? null,
  course_code: score?.course_code ?? null,
  course_credit: score?.course_credit ?? score?.credit ?? null,
  caScore: toNumber(score?.ca_score),
  score: toScoreInput(score?.score),
  gradePoints: toNumber(score?.grade_points),
  result: score?.result || "N/A",
  resitResult: score?.resit_result || "N/A",
  performance: score?.performance || "N/A",
  grade: score?.grade || "N/A",
});

const withKey = (course) => course && course.key !== undefined && course.key !== null;

/**
 * The CA, exam and resit score dialogs share one state shape: `scores` for
 * adding, `update.initial` / `update.draft` for updating.
 *
 * mapCourse(item) turns one entry of the add helper's list into
 * { key, course_id, course_title, course_code, course_credit, caScore?, ... }
 * or null to skip it. Entries without a key are dropped so a deleted course
 * can never break the dialog.
 */
export const createScoreEntrySlice = ({
  name,
  resetName,
  mapCourse,
  defaultMaxScore = 100,
  defaultCaMaxScore = 0,
}) => {
  const initialState = emptyState();

  const slice = createSlice({
    name,
    initialState,
    reducers: {
      setInitialData: (state, action) => {
        const { courses, gradeScale, maxGpa, maxScore, caMaxScore } = action.payload ?? {};
        state.gradeScale = mapGradeScale(gradeScale);
        state.scores = toList(courses)
          .map((item) => {
            try {
              return mapCourse(item);
            } catch {
              return null;
            }
          })
          .filter(withKey)
          .map((course) => ({
            caScore: 0,
            ...course,
            score: "",
            ...gradeFields([], NaN),
          }));
        state.resultSummary = summariseScores(state.scores);
        state.maxGpa = toNumber(maxGpa);
        state.maxScore = toNumber(maxScore, defaultMaxScore);
        state.caMaxScore = toNumber(caMaxScore, defaultCaMaxScore);
      },

      setUpdateInitialData: (state, action) => {
        const { courses, gradeScale, maxGpa, maxScore, caMaxScore } = action.payload ?? {};
        const scale = mapGradeScale(gradeScale);
        const scores = toList(courses).map(mapStoredScore).filter(withKey);
        const summary = summariseScores(scores);

        state.update.gradeScale = scale;
        state.update.maxGpa = toNumber(maxGpa);
        state.update.maxScore = toNumber(maxScore, defaultMaxScore);
        state.update.caMaxScore = toNumber(caMaxScore, defaultCaMaxScore);
        state.update.initial = { scores, resultSummary: summary };
        state.update.draft = {
          scores: scores.map((course) => ({ ...course })),
          resultSummary: summary,
        };
        state.update.isDirty = false;
      },

      // payload: { key, score } (courseId is still accepted)
      updateScore: (state, action) => {
        const { key, courseId, score } = action.payload ?? {};
        const course = state.scores.find((item) =>
          key !== undefined ? item.key === key : item.course_id === courseId,
        );
        if (course) {
          course.score = score ?? "";
          regrade(course, state.gradeScale);
        }
        state.resultSummary = summariseScores(state.scores);
      },

      // payload: { scoreId, score }
      updateDraftScore: (state, action) => {
        const { scoreId, score } = action.payload ?? {};
        const course = state.update.draft.scores.find((item) => item.id === scoreId);
        if (course) {
          course.score = score ?? "";
          regrade(course, state.update.gradeScale);
        }
        state.update.draft.resultSummary = summariseScores(state.update.draft.scores);
        state.update.isDirty = scoresChanged(
          state.update.draft.scores,
          state.update.initial.scores,
        );
      },

      resetUpdateState: (state) => {
        state.update = emptyState().update;
      },

      [resetName]: () => emptyState(),
    },
  });

  return slice;
};

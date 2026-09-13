import { createSlice } from "@reduxjs/toolkit";
import { RESIT_LABEL, RESULT, RESULT_LABEL } from "@/constants";

const initialState = {
  scores: [],
  gradeScale: [],
  resultSummary: {
    coursesPassed: 0,
    coursesFailed: 0,
    examStatus: "NA",
    totalScore: 0,
    totalCredit: 0,
    totalGradePoints: 0,
    gpa: 0,
  },
  maxGpa: 0.0,
  maxScore: 0,
};

const caEvaluationSlice = createSlice({
  name: "caEvalutation",
  initialState: initialState,
  reducers: {
    setInitialData: (state, action) => {
      const { courses = [], gradeScale = [], maxGpa = 0.0, maxScore = 100 } = action.payload;

      state.scores = courses.map((course) => ({
        course_id: course.id,
        course_title: course.course_title,
        course_code: course.course_code,
        course_credit: course.credit,
        score: "",
        gradePoints: 0,
        result: "N/A",
        resitResult: "N/A",
        performance: "N/A",
        grade: "N/A",
      }));

      state.gradeScale = gradeScale.map((gs) => ({
        scale_id: gs.id,
        gradePoints: gs.grade_points,
        result: gs.result,
        maximumScore: gs.maximum_score,
        minimumScore: gs.minimum_score,
        performance: gs.performance,
        resitResult: gs.resit_result,
        grade: gs.grade?.letter_grade || gs.grade,
      }));

      state.maxGpa = maxGpa;
      state.maxScore = maxScore;
    },
    updateScore: (state, action) => {
      const { courseId, score } = action.payload;
      const newScore = isNaN(score) ? 0 : parseFloat(score);

      // Unique lookup using course_id instead of index
      const courseToUpdate = state.scores.find(
        (course) => course.course_id === courseId
      );

      if (courseToUpdate) {
        const grade = state.gradeScale.find(
          (g) => newScore >= g.minimumScore && newScore <= g.maximumScore,
        );

        if (grade) {
          courseToUpdate.score = newScore;
          courseToUpdate.gradePoints = grade.gradePoints;
          courseToUpdate.result = grade.result;
          courseToUpdate.resitResult = grade.resitResult;
          courseToUpdate.performance = grade.performance;
          courseToUpdate.grade = grade.grade;
        } else {
          courseToUpdate.score = newScore;
          courseToUpdate.gradePoints = 0;
          courseToUpdate.result = "NA";
          courseToUpdate.resitResult = "NA";
          courseToUpdate.performance = "NA";
          courseToUpdate.grade = "NA";
        }
      }

      state.resultSummary = calculateResultSummary(state.scores);
    },
    resetCaScoreState: () => initialState,
  },
});

const calculateResultSummary = (scores) => {
  let coursesPassed = 0;
  let coursesFailed = 0;
  let totalGradePoints = 0;

  const totalCourses = scores.length;

  scores.forEach((course) => {
    const status = course.result?.toLowerCase();
    if (status === RESULT.PASSED || status === "pass") {
      coursesPassed++;
    } else if (status === RESULT.FAILED || status === "fail") {
      coursesFailed++;
    }

    const points = typeof course.gradePoints === "number" ? course.gradePoints : 0;
    totalGradePoints += points;
  });

  const gpa = totalCourses > 0 ? totalGradePoints / totalCourses : 0;
  const examStatus = coursesFailed > 0 ? RESULT_LABEL[RESULT.FAILED] : RESULT_LABEL[RESULT.PASSED];

  return { coursesPassed, coursesFailed, totalGradePoints, gpa, examStatus };
};

export const {
  setInitialData,
  updateScore,
  resetCaScoreState,
} = caEvaluationSlice.actions;

export default caEvaluationSlice.reducer;
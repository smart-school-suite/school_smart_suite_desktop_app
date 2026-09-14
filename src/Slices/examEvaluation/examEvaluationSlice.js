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
  caMaxScore: 0,
};

const examEvaluationSlice = createSlice({
  name: "examEvaluation",
  initialState: initialState,
  reducers: {
    setInitialData: (state, action) => {
      const {
        caScores = [],
        gradeScale = [],
        maxGpa = 0.0,
        maxScore = 70,
        caMaxScore = 30,
      } = action.payload;

      state.scores = caScores.map((item) => ({
        course_id: item.course.id,
        course_title: item.course.course_title,
        course_code: item.course.course_code,
        course_credit: item.course.credit,
        caScore: parseFloat(item.score) || 0,
        score: "", // Exam score provided by user
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
      state.caMaxScore = caMaxScore;
    },

    updateScore: (state, action) => {
      const { courseId, score } = action.payload;
      const parsedExamScore = score === "" || isNaN(score) ? 0 : parseFloat(score);

      const courseToUpdate = state.scores.find(
        (course) => course.course_id === courseId
      );

      if (courseToUpdate) {
        const caScore =
          typeof courseToUpdate.caScore === "number"
            ? courseToUpdate.caScore
            : parseFloat(courseToUpdate.caScore) || 0;

        // Total score = CA + Exam (score)
        const totalScore = caScore + parsedExamScore;

        const grade = state.gradeScale.find(
          (g) => totalScore >= g.minimumScore && totalScore <= g.maximumScore
        );

        // Directly store user input in 'score'
        courseToUpdate.score = score;

        if (grade) {
          courseToUpdate.gradePoints = grade.gradePoints;
          courseToUpdate.result = grade.result;
          courseToUpdate.resitResult = grade.resitResult;
          courseToUpdate.performance = grade.performance;
          courseToUpdate.grade = grade.grade;
        } else {
          courseToUpdate.gradePoints = 0;
          courseToUpdate.result = "NA";
          courseToUpdate.resitResult = "NA";
          courseToUpdate.performance = "NA";
          courseToUpdate.grade = "NA";
        }
      }

      state.resultSummary = calculateResultSummary(state.scores);
    },

    resetExamScoreState: () => initialState,
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
  const examStatus =
    coursesFailed > 0 ? RESULT.FAILED : RESULT.PASSED;

  return { coursesPassed, coursesFailed, totalGradePoints, gpa, examStatus };
};

export const { setInitialData, updateScore, resetExamScoreState } =
  examEvaluationSlice.actions;

export default examEvaluationSlice.reducer;
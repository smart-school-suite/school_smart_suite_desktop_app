import { createSlice } from "@reduxjs/toolkit";

const ResitExamScoreSlice = createSlice({
  name: "createResitExamScore",
  initialState: {
    examScores: [],
    examGrading: [],
    resultSummary: {
      coursesPassed: 0,
      coursesFailed: 0,
      examStatus: "NA",
      totalScore: 0,
      totalCredit: 0,
      gpa: 0,
    },
  },
  reducers: {
    setExamScores: (state, action) => {
      state.examScores = [...action.payload];
    },
    setExamGrading: (state, action) => {
      state.examGrading = [...action.payload];
    },
    updateScore: (state, action) => {
      const { index, score } = action.payload;

      const newScore = isNaN(score) ? 0 : parseFloat(score);

      const courseToUpdate = state.examScores[index];
      
      if (courseToUpdate) {
        const grade = state.examGrading.find(
          (g) => newScore >= g.minimumScore && newScore <= g.maximumScore
        );

        if (grade) {
          courseToUpdate.score = newScore;
          courseToUpdate.gradePoints = grade.gradePoints;
          courseToUpdate.gradeStatus = grade.gradeStatus;
          courseToUpdate.resitStatus = grade.resitStatus;
          courseToUpdate.determinant = grade.determinant;
          courseToUpdate.letterGrade = grade.letterGrade;
        } else {
          courseToUpdate.score = newScore;
          courseToUpdate.gradePoints = 0;
          courseToUpdate.gradeStatus = "NA";
          courseToUpdate.examScore = "NA";
          courseToUpdate.resitStatus = "NA";
          courseToUpdate.determinant = "NA";
          courseToUpdate.letterGrade = "NA";
        }
      }

      let coursesPassed = 0;
      let coursesFailed = 0;
      let totalGradePoints = 0;

      const totalCourses = state.examScores.length;

      state.examScores.forEach((course) => {
        if (course.gradeStatus === "passed") {
          coursesPassed++;
        } else if (course.gradeStatus === "failed") {
          coursesFailed++;
        }
        totalGradePoints += course.gradePoints;
      });

      const examStatus = coursesFailed > 0 ? "Failed" : "Passed";

      state.resultSummary.coursesPassed = coursesPassed;
      state.resultSummary.coursesFailed = coursesFailed;
      state.resultSummary.examStatus = examStatus;
    },
    resetResitScoreState: (state) => {
       return ResitExamScoreSlice.initialState;
    }
  },
});

export const { setExamScores, setExamGrading,  updateScore, resetResitScoreState } =
  ResitExamScoreSlice.actions;

export default ResitExamScoreSlice.reducer;

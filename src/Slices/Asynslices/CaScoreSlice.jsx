import { createSlice } from "@reduxjs/toolkit";

const CaScoreSlice = createSlice({
  name: "createCaScore",
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
    maxGpa: 0.0,
  },
  reducers: {
    setExamScores: (state, action) => {
      const { examScores, recalculate = false } = action.payload;
      state.examScores = [...examScores];

      if (recalculate) {
        // Recalculate resultSummary
        const { coursesPassed, coursesFailed, gpa, examStatus } = calculateResultSummary(state.examScores);
        state.resultSummary.coursesPassed = coursesPassed;
        state.resultSummary.coursesFailed = coursesFailed;
        state.resultSummary.examStatus = examStatus;
        state.resultSummary.gpa = gpa;
      }
    },
    setExamGrading: (state, action) => {
      state.examGrading = [...action.payload];
    },
    setMaxGpa: (state, action) => {
      state.maxGpa = action.payload;
    },
    updateScore: (state, action) => {
      const { index, score } = action.payload;
      // Ensure the score is a number; default to 0 if not
      const newScore = isNaN(score) ? 0 : parseFloat(score);

      // 1. Update the specific course entry in examScores
      const courseToUpdate = state.examScores[index];
      if (courseToUpdate) {
        // Find the corresponding grade details from examGrading based on the new score
        const grade = state.examGrading.find(
          (g) => newScore >= g.minimumScore && newScore <= g.maximumScore
        );

        if (grade) {
          // If a matching grade is found, update the course's attributes
          courseToUpdate.score = newScore;
          courseToUpdate.gradePoints = grade.gradePoints;
          courseToUpdate.gradeStatus = grade.gradeStatus;
          courseToUpdate.resitStatus = grade.resitStatus;
          courseToUpdate.determinant = grade.determinant;
          courseToUpdate.letterGrade = grade.letterGrade;
        } else {
          // If no matching grade range is found, set default/NA values
          courseToUpdate.score = newScore;
          courseToUpdate.gradePoints = 0;
          courseToUpdate.gradeStatus = "NA";
          courseToUpdate.resitStatus = "NA";
          courseToUpdate.determinant = "NA";
          courseToUpdate.letterGrade = "NA";
        }
      }

      // 2. Recalculate the result summary based on the updated examScores array
      const { coursesPassed, coursesFailed, gpa, examStatus } = calculateResultSummary(state.examScores);
      state.resultSummary.coursesPassed = coursesPassed;
      state.resultSummary.coursesFailed = coursesFailed;
      state.resultSummary.examStatus = examStatus;
      state.resultSummary.gpa = gpa;
    },
    resetCaScoreState: () => {
      return CaScoreSlice.initialState;
    },
  },
});

// Helper function to calculate resultSummary
const calculateResultSummary = (examScores) => {
  let coursesPassed = 0;
  let coursesFailed = 0;
  let totalGradePoints = 0;

  const totalCourses = examScores.length;

  examScores.forEach((course) => {
    if (course.gradeStatus === "passed") {
      coursesPassed++;
    } else if (course.gradeStatus === "failed") {
      coursesFailed++;
    }
    totalGradePoints += course.gradePoints;
  });

  const gpa = totalCourses > 0 ? totalGradePoints / totalCourses : 0;
  const examStatus = coursesFailed > 0 ? "Failed" : "Passed";

  return { coursesPassed, coursesFailed, gpa, examStatus };
};

export const {
  setExamScores,
  setExamGrading,
  setMaxGpa,
  updateScore,
  resetCaScoreState,
} = CaScoreSlice.actions;

export default CaScoreSlice.reducer;
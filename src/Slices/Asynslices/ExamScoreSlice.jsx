import { createSlice } from "@reduxjs/toolkit";

const ExamScoreSlice = createSlice({
  name: "createExamScore",
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
      const newScore = isNaN(score) ? 0 : parseFloat(score);
      const caScore = state.examScores[index].caScore;
      const courseToUpdate = state.examScores[index];

      if (courseToUpdate) {
        const totalScore = caScore + newScore;
        const grade = state.examGrading.find(
          (g) => totalScore >= g.minimumScore && totalScore <= g.maximumScore
        );

        if (grade) {
          courseToUpdate.score = totalScore;
          courseToUpdate.examScore = newScore;
          courseToUpdate.gradePoints = grade.gradePoints;
          courseToUpdate.gradeStatus = grade.gradeStatus;
          courseToUpdate.resitStatus = grade.resitStatus;
          courseToUpdate.determinant = grade.determinant;
          courseToUpdate.letterGrade = grade.letterGrade;
        } else {
          courseToUpdate.score = totalScore;
          courseToUpdate.examScore = newScore;
          courseToUpdate.gradePoints = 0;
          courseToUpdate.gradeStatus = "NA";
          courseToUpdate.resitStatus = "NA";
          courseToUpdate.determinant = "NA";
          courseToUpdate.letterGrade = "NA";
        }
      }

      const { coursesPassed, coursesFailed, gpa, examStatus } = calculateResultSummary(state.examScores);
      state.resultSummary.coursesPassed = coursesPassed;
      state.resultSummary.coursesFailed = coursesFailed;
      state.resultSummary.examStatus = examStatus;
      state.resultSummary.gpa = gpa;
    },
    resetExamScoreState: () => {
      return ExamScoreSlice.initialState;
    },
  },
});

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

export const { setExamScores, setExamGrading, setMaxGpa, updateScore, resetExamScoreState } =
  ExamScoreSlice.actions;

export default ExamScoreSlice.reducer;
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
    // This reducer handles all the logic for a score change, including
    // updating the specific course and recalculating the overall summary
    updateScore: (state, action) => {
      const { index, score } = action.payload;
      // Ensure the score is a number; default to 0 if not
      const newScore = isNaN(score) ? 0 : parseFloat(score);

      // 1. Update the specific course entry in examScores
      const courseToUpdate = state.examScores[index];
      //ca score 
      
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
          courseToUpdate.examScore = "NA";
          courseToUpdate.resitStatus = "NA";
          courseToUpdate.determinant = "NA";
          courseToUpdate.letterGrade = "NA";
        }
      }

      // 2. Recalculate the result summary based on the updated examScores array
      let coursesPassed = 0;
      let coursesFailed = 0;
      let totalGradePoints = 0; // Sum of grade points for normal GPA calculation

      const totalCourses = state.examScores.length; // Total number of courses

      state.examScores.forEach((course) => {
        // Increment pass/fail counts based on gradeStatus
        if (course.gradeStatus === "passed") {
          coursesPassed++;
        } else if (course.gradeStatus === "failed") {
          coursesFailed++;
        }

        // Accumulate grade points for GPA calculation
        totalGradePoints += course.gradePoints;
      });


      // Determine the overall exam status
      const examStatus = coursesFailed > 0 ? "Failed" : "Passed";

      // 3. Update the resultSummary object in the state
      state.resultSummary.coursesPassed = coursesPassed;
      state.resultSummary.coursesFailed = coursesFailed;
      state.resultSummary.examStatus = examStatus;
    },
  },
});

export const { setExamScores, setExamGrading,  updateScore } =
  ResitExamScoreSlice.actions;

export default ResitExamScoreSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
const studentScoreSlice = createSlice({
     name:"studentScore",
     initialState:{
        formData:[],
        letterGrades:[],
        gpa:0.0,
     },
     reducers:{
        setScores: (state, action) => {
         state.formData = action.payload.map((item) => ({
            ...item
          }));
        },
        setGrades: (state, action) => {
         state.letterGrades = action.payload.map((item) => ({
            ...item
          }));
        },
        resetGpa: (state) => {
          state.gpa = 0.0;
        },
        updateScore: (state, action) => {
         const { index, score } = action.payload;

         // Update the score in formData
         state.formData[index].score = score;
         
         // Ensure letterGrades is sorted in ascending order
         const sortedGrades = [...state.letterGrades].sort((a, b) => a.minimum_score - b.minimum_score);
         
         // Find the appropriate letter grade and grade points
         const letterGradeEntry = sortedGrades.find(({ minimum_score, maximum_score }) => 
           score >= minimum_score && score <= maximum_score
         );
         
         if (letterGradeEntry) {
           // Update formData with the letter grade and grade points
           state.formData[index].letter_grade = letterGradeEntry.letter_grade;
           state.formData[index].grade_points = letterGradeEntry.grade_points;
           state.formData[index].determinant = letterGradeEntry.determinant;
           state.formData[index].status = letterGradeEntry.grade_status;
         } else {
           // Default to 'F' if no grade is found (e.g., score below range)
           state.formData[index].letter_grade = "F";
           state.formData[index].grade_points = 0;
           state.formData[index].determinant = "Poor";
           state.formData[index].status = "fail";
         }
         
         
         // --- Real-time GPA Calculation ---
         let totalWeightedGradePoints = 0;
         let totalCredits = 0;
         
         state.formData.forEach(item => {
           if (!isNaN(item.score) && item.score !== null && item.score !== "") {
             totalWeightedGradePoints += (item.grade_points || 0) * (item.course_credit || 1);
             totalCredits += item.course_credit || 1;
           }
         });
         
         state.gpa = totalCredits > 0 ? (totalWeightedGradePoints / totalCredits).toFixed(2) : 0.0;
         
       }
       
       
     }
})
export const { setScores, setGrades, updateScore, resetGpa } = studentScoreSlice.actions;
export default studentScoreSlice.reducer;
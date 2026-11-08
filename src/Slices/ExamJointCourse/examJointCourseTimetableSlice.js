import { createSlice } from "@reduxjs/toolkit";

// The joint exam page: which academic year and exam type is open, and which joint exam is selected.
const examJointCourseTimetableSlice = createSlice({
  name: "examJointCourseTimetable",
  initialState: { term: null, selectedCourseId: null },
  reducers: {
    setExamJointCourseTerm(state, action) {
      if (state.term?.id !== action.payload?.id) state.selectedCourseId = null;
      state.term = action.payload ?? null;
    },
    setSelectedExamJointCourse(state, action) {
      state.selectedCourseId = action.payload ?? null;
    },
  },
});

export const { setExamJointCourseTerm, setSelectedExamJointCourse } = examJointCourseTimetableSlice.actions;
export default examJointCourseTimetableSlice.reducer;

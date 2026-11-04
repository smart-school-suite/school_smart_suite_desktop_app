import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  term: null,
  selectedCourseId: null,
};

const jointCourseTimetableSlice = createSlice({
  name: "jointCourseTimetable",
  initialState,
  reducers: {
    setJointCourseTerm: (state, action) => {
      if (state.term?.id !== action.payload?.id) {
        state.selectedCourseId = null;
      }
      state.term = action.payload;
    },
    setSelectedJointCourse: (state, action) => {
      state.selectedCourseId = action.payload;
    },
  },
});

export const { setJointCourseTerm, setSelectedJointCourse } =
  jointCourseTimetableSlice.actions;

export default jointCourseTimetableSlice.reducer;

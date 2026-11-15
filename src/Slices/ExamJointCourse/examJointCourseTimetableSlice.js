import { createSlice } from "@reduxjs/toolkit";

/**
 * A joint course page: which academic year and exam type is open, and which
 * joint course is selected. The exam and resit joint course timetables use
 * the same reducers.
 */
export const createJointCourseTimetableSlice = (name) =>
  createSlice({
    name,
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

const examJointCourseTimetableSlice = createJointCourseTimetableSlice("examJointCourseTimetable");

export const { setExamJointCourseTerm, setSelectedExamJointCourse } = examJointCourseTimetableSlice.actions;
export default examJointCourseTimetableSlice.reducer;

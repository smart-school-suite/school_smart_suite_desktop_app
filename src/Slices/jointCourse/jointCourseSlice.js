import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // TODO: define initial state
};

const jointCourseSlice = createSlice({
  name: 'jointCourse',
  initialState,
  reducers: {
    // TODO: add reducers
    // example:
    // setLoading: (state, action) => {
    //   state.loading = action.payload;
    // },
  },
});

export const {
  // TODO: export actions
} = jointCourseSlice.actions;

export default jointCourseSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // TODO: define initial state
};

const jointCourseTimetableSlice = createSlice({
  name: 'jointCourseTimetable',
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
} = jointCourseTimetableSlice.actions;

export default jointCourseTimetableSlice.reducer;
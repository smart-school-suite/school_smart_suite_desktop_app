import { createJointCourseTimetableSlice } from "../ExamJointCourse/examJointCourseTimetableSlice";

// The resit joint course page, the same state as the exam one.
const resitJointCourseTimetableSlice = createJointCourseTimetableSlice("resitJointCourseTimetable");

export const resitJointCourseTimetableActions = resitJointCourseTimetableSlice.actions;
export default resitJointCourseTimetableSlice.reducer;

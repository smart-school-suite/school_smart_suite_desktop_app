import { createExamTimetableSlice } from "../ExamTimetable/examTimetableSlice";

/**
 * Resit timetable page state, the same shape as the exam timetable's:
 * `exam` is the selected resit exam.
 */
const resitTimetableSlice = createExamTimetableSlice("resitTimetable");

export const {
  setTimetableExam: setTimetableResitExam,
  setExamTimetableVersion: setResitTimetableVersion,
  setExamConstraint: setResitConstraint,
  patchExamConstraint: patchResitConstraint,
  addExamRequest: addResitRequest,
  updateExamRequest: updateResitRequest,
  removeExamRequest: removeResitRequest,
  resetExamConstraint: resetResitConstraint,
} = resitTimetableSlice.actions;

export const resitTimetableActions = resitTimetableSlice.actions;

export default resitTimetableSlice.reducer;

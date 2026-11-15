import axiosInstance from "../axios/authAxios";

// The resit joint course timetable: same endpoints and shapes as the exam one.
const BASE = "resit-joint-course-timetable";

export const getResitJointCourseTerms = async () => (await axiosInstance.get(`${BASE}/terms`)).data;

// Re-syncs the term's joint resits from who resits what, then lists them.
export const getResitJointCourseTerm = async (schoolYearId, examTypeId) =>
  (await axiosInstance.get(`${BASE}/term/${schoolYearId}/${examTypeId}`)).data;

export const syncResitJointCourses = async (resitExamId) => (await axiosInstance.post(`${BASE}/resit-exam/${resitExamId}/sync`)).data;

// payload: { duration, dates?, start_time?, end_time?, step_minutes? }
export const generateResitJointCourseTimes = async (jointCourseId, payload) =>
  (await axiosInstance.post(`${BASE}/${jointCourseId}/generate`, payload)).data;

// Saves the one picked time. A 422 carries errors.conflicts.
export const confirmResitJointCourseTime = async (jointCourseId, proposalId, optionId) =>
  (await axiosInstance.post(`${BASE}/${jointCourseId}/proposals/${proposalId}/confirm`, { option_id: optionId })).data;

export const removeResitJointCourseTime = async (jointCourseId) => (await axiosInstance.delete(`${BASE}/${jointCourseId}/slot`)).data;

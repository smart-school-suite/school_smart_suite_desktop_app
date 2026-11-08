import axiosInstance from "../axios/authAxios";

const BASE = "exam-joint-course-timetable";

export const getExamJointCourseTerms = async () => {
  const response = await axiosInstance.get(`${BASE}/terms`);
  return response.data;
};

export const getExamJointCourseTerm = async (schoolYearId, examTypeId) => {
  const response = await axiosInstance.get(`${BASE}/term/${schoolYearId}/${examTypeId}`);
  return response.data;
};

// Links an exam created before joint exams existed to its joint exams.
export const syncExamJointCourses = async (examId) => {
  const response = await axiosInstance.post(`${BASE}/exam/${examId}/sync`);
  return response.data;
};

// payload: { duration, dates?, start_time?, end_time?, step_minutes? }
// Returns the free times by date, kept on the server as a proposal.
export const generateExamJointCourseTimes = async (examJointCourseId, payload) => {
  const response = await axiosInstance.post(`${BASE}/${examJointCourseId}/generate`, payload);
  return response.data;
};

// Saves the one picked time. A 422 carries errors.conflicts.
export const confirmExamJointCourseTime = async (examJointCourseId, proposalId, optionId) => {
  const response = await axiosInstance.post(`${BASE}/${examJointCourseId}/proposals/${proposalId}/confirm`, {
    option_id: optionId,
  });
  return response.data;
};

export const removeExamJointCourseTime = async (examJointCourseId) => {
  const response = await axiosInstance.delete(`${BASE}/${examJointCourseId}/slot`);
  return response.data;
};

import axiosInstance from "../axios/authAxios";


export const submitResitScores = async (candidateId, data) => {
  const response = await axiosInstance.post(`student-resit/candidates/${candidateId}/resit-results`, data);
  return response.data;
};

export const updateResitScores = async (candidateId, studentResitResultId, data) => {
  const response = await axiosInstance.put(`student-resit/student-resits/${candidateId}/${studentResitResultId}`, data);
  return response.data;
};

export const getResitEvaluationHelperData = async (resitExamId, candidateId) => {
  const response = await axiosInstance.get(`student-resit/resit-exams/${resitExamId}/candidates/${candidateId}/evaluation-data`);
  return response.data;
};
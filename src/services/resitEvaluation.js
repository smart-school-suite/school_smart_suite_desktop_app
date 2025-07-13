import axiosInstance from "../axios/authAxios";


export const submitResitScores = async (candidateId, data) => {
  const response = await axiosInstance.post(`student-resit/candidates/${candidateId}/resit-results`, data);
  return response.data;
};

export const updateResitScores = async (candidateId, studentResitResultId, data) => {
  const response = await axiosInstance.put(`student-resit/student-resits/${candidateId}/${studentResitResultId}`, data);
  return response.data;
};

export const prepareResitData = async (examId, studentId) => {
  const response = await axiosInstance.get(`student-resit/student-resits/${examId}/${studentId}/data`);
  return response.data;
};
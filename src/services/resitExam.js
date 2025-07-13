import axiosInstance from "../axios/authAxios";



export const getAllResitExams = async () => {
  const response = await axiosInstance.get("resit-exam");
  return response.data;
};

export const bulkAddResitExamGradingConfigs = async (gradingConfigs) => {
  const response = await axiosInstance.post("resit-exam/bulk-add-grading-configs", gradingConfigs);
  return response.data;
};

export const bulkDeleteResitExam = async (resitExamIds) => {
  const response = await axiosInstance.post("resit-exam/bulk-delete", { ids: resitExamIds });
  return response.data;
};

export const bulkUpdateResitExam = async (updates) => {
  const response = await axiosInstance.put("resit-exam/bulk-update", updates);
  return response.data;
};

export const getResitExamDetails = async (resitExamId) => {
  const response = await axiosInstance.get(`resit-exam/${resitExamId}`);
  return response.data;
};

export const updateResitExam = async (resitExamId, data) => {
  const response = await axiosInstance.put(`resit-exam/${resitExamId}`, data);
  return response.data;
};

export const deleteResitExam = async (resitExamId) => {
  const response = await axiosInstance.delete(`resit-exam/${resitExamId}`);
  return response.data;
};

export const addResitExamGrading = async (resitExamId, gradesConfigId, data = {}) => {
  const response = await axiosInstance.post(`resit-exam/${resitExamId}/grading-configs/${gradesConfigId}`, data);
  return response.data;
};

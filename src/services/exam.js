import axiosInstance from "../axios/authAxios";

export const createExam = async (data) => {
  const response = await axiosInstance.post("exam", data);
  return response.data;
};

export const getExams = async () => {
  const response = await axiosInstance.get("exam");
  return response.data;
};

export const bulkAddExamGradingConfigs = async (gradingConfigs) => {
  const response = await axiosInstance.post("exam/bulk-add-grading-configs", gradingConfigs);
  return response.data;
};

export const bulkDeleteExam = async (examIds) => {
  const response = await axiosInstance.post("exam/bulk-delete", { ids: examIds });
  return response.data;
};

export const bulkUpdateExam = async (updates) => {
  const response = await axiosInstance.patch("exam/bulk-update", updates);
  return response.data;
};


export const getExamDetails = async (examId) => {
  const response = await axiosInstance.get(`exam/${examId}`);
  return response.data;
};

export const updateExam = async (examId, data) => {
  const response = await axiosInstance.put(`exam/${examId}`, data);
  return response.data;
};

export const deleteExam = async (examId) => {
  const response = await axiosInstance.delete(`exam/${examId}`);
  return response.data;
};

export const addExamGrading = async (examId, gradesConfig, data={}) => {
  const response = await axiosInstance.post(`exam/${examId}/grading-configs/${gradesConfig}`, data);
  return response.data;
};

export const associateWeightedMarkWithLetterGrades = async (examId) => {
  const response = await axiosInstance.get(`exam/${examId}/letter-grades`);
  return response.data;
};
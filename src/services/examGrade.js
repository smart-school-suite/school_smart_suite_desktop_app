import axiosInstance from "../axios/authAxios";


export const createExamGrades = async (data) => {
  const response = await axiosInstance.post("grade/exam-grades", data);
  return response.data;
};

export const getAllGrades = async () => {
  const response = await axiosInstance.get("grade/exam-grades");
  return response.data;
};

export const updateGrades = async (gradeId, data) => {
  const response = await axiosInstance.put(`grade/exam-grades/${gradeId}`, data);
  return response.data;
};

export const bulkDeleteGrades = async (gradeIds) => {
  const response = await axiosInstance.post("grade/exams/bulk-delete-grades", { ids: gradeIds });
  return response.data;
};

export const getExamConfigData = async (examId) => {
  const response = await axiosInstance.get(`grade/exams/${examId}/config-data`);
  return response.data;
};

export const deleteGrades = async (examId) => {
  const response = await axiosInstance.delete(`grade/exams/${examId}/grades`);
  return response.data;
};

export const getGradesConfigByExam = async (examId) => {
  const response = await axiosInstance.get(`grade/exams/${examId}/grades-config`);
  return response.data;
};

export const getRelatedExams = async (examId) => {
  const response = await axiosInstance.get(`grade/exams/${examId}/related-exams`);
  return response.data;
};

export const createGradesByOtherGrades = async (configId, targetConfigId, data={}) => {
  const response = await axiosInstance.post(`grade/grade-configs/${configId}/target-configs/${targetConfigId}/grades`, data);
  return response.data;
};

export const autoGenExamGrades = async (data) => {
   const response = await axiosInstance.post("grade/auto-gen-grading", data);
   return response.data;
}

export const deleteGradeConfig = async (configId) => {
   const response = await axiosInstance.delete(`grade/grade-config/delete/${configId}`);
   return response.data;
}

export const getGradeConfigDetails = async (configId) => {
   const response = await axiosInstance.get(`grade/grades-config/details/${configId}`);
   return response.data;
}

export const  bulkUpdateExamGrades = async (data) => {
   const response = await axiosInstance.patch("grade/exam-grades/update ", data);
   return response.data;
}
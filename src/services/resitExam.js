import axiosInstance from "../axios/authAxios";

export const getAllResitExams = async () => {
  const response = await axiosInstance.get("resit-exam");
  return response.data;
};

export const bulkAddResitExamGradingConfigs = async (gradingConfigs) => {
  const response = await axiosInstance.post(
    "resit-exam/bulk-add-grading-configs",
    gradingConfigs,
  );
  return response.data;
};

export const bulkDeleteResitExam = async (resitExamIds) => {
  const response = await axiosInstance.post("resit-exam/bulk-delete", {
    ids: resitExamIds,
  });
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

export const updateResitExam = async ({ resitExamId, updateData }) => {
  const response = await axiosInstance.put(
    `resit-exam/${resitExamId}`,
    updateData,
  );
  return response.data;
};

export const deleteResitExam = async (resitExamId) => {
  const response = await axiosInstance.delete(`resit-exam/${resitExamId}`);
  return response.data;
};

export const addResitExamGradeScale = async (
  resitExamId,
  gradeScaleCategoryId,
  data = {},
) => {
  const response = await axiosInstance.post(
    `resit-exam/${resitExamId}/grade-scale-category/${gradeScaleCategoryId}/add`,
    data,
  );
  return response.data;
};

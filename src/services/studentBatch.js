import axiosInstance from "../axios/authAxios";


export const createStudentBatch = async (data) => {
  const response = await axiosInstance.post("student-batch", data);
  return response.data;
};

export const getStudentBatch = async () => {
  const response = await axiosInstance.get("student-batch");
  return response.data;
};

export const bulkActivateStudentBatch = async (batchIds) => {
  const response = await axiosInstance.post("student-batch/bulk-activate", { ids: batchIds });
  return response.data;
};

export const bulkDeactivateStudentBatch = async (batchIds) => {
  const response = await axiosInstance.post("student-batch/bulk-deactivate", { ids: batchIds });
  return response.data;
};

export const bulkDeleteStudentBatch = async (batchIds) => {
  const response = await axiosInstance.post("student-batch/bulk-delete", { ids: batchIds });
  return response.data;
};

export const bulkUpdateStudentBatch = async (updates) => {
  const response = await axiosInstance.patch("student-batch/bulk-update", updates);
  return response.data;
};

export const updateStudentBatch = async (batchId, data) => {
  const response = await axiosInstance.put(`student-batch/${batchId}`, data);
  return response.data;
};

export const deleteStudentBatch = async (batchId) => {
  const response = await axiosInstance.delete(`student-batch/${batchId}`);
  return response.data;
};

export const activateStudentBatch = async (batchId) => {
  const response = await axiosInstance.post(`student-batch/${batchId}/activate`);
  return response.data;
};

export const deactivateStudentBatch = async (batchId) => {
  const response = await axiosInstance.post(`student-batch/${batchId}/deactivate`);
  return response.data;
};
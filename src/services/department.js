import axiosInstance from "../axios/authAxios";
import axiosUploadInstance from "../axios/axiosUploadInstance";
import { appendFormData } from "../utils/functions";

export const createDepartment = async (data) => {
  const response = await axiosInstance.post("department", data);
  return response.data;
};

export const getDepartments = async () => {
  const response = await axiosInstance.get("department");
  return response.data;
};

export const bulkActivateDepartment = async (activateData) => {
  const response = await axiosInstance.post(
    "department/bulk-activate",
    activateData,
  );
  return response.data;
};

export const bulkDeactivateDepartment = async (activateData) => {
  const response = await axiosInstance.post(
    "department/bulk-deactivate",
    activateData,
  );
  return response.data;
};

export const bulkDeleteDepartment = async (deleteData) => {
  const response = await axiosInstance.post(
    "department/bulk-delete",
    deleteData,
  );
  return response.data;
};

export const bulkUpdateDepartment = async (updates) => {
  const response = await axiosInstance.patch("department/bulk-update", updates);
  return response.data;
};

export const getDepartmentDetails = async (departmentId) => {
  const response = await axiosInstance.get(`department/${departmentId}`);
  return response.data;
};

export const updateDepartment = async (departmentId, data) => {
  const response = await axiosInstance.put(`department/${departmentId}`, data);
  return response.data;
};

export const deleteDepartment = async (departmentId) => {
  const response = await axiosInstance.delete(`department/${departmentId}`);
  return response.data;
};

export const activateDepartment = async (departmentId, data = {}) => {
  const response = await axiosInstance.post(
    `department/${departmentId}/activate`,
    data,
  );
  return response.data;
};

export const deactivateDepartment = async (departmentId, data = {}) => {
  const response = await axiosInstance.post(
    `department/${departmentId}/deactivate`,
    data,
  );
  return response.data;
};

export const importDepartment = async (payload) => {
  const formData = new FormData();
  formData.append("file", payload.file, payload.file.name);
  appendFormData(formData, payload.mapping, "mapping");
  const response = await axiosUploadInstance.post(
    "department/import",
    formData,
  );
  return response.data;
};



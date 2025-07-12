import axiosInstance from "../axios/authAxios";


export const createDepartment = async (data) => {
  const response = await axiosInstance.post("department", data);
  return response.data;
};

export const getDepartments = async () => {
  const response = await axiosInstance.get("department");
  return response.data;
};

export const bulkActivateDepartment = async (activateData) => {
  const response = await axiosInstance.post("department/bulk-activate", activateData);
  return response.data;
};

export const bulkDeactivateDepartment = async (activateData) => {
  const response = await axiosInstance.post("department/bulk-deactivate", activateData);
  return response.data;
};


export const bulkDeleteDepartment = async (deleteData) => {
  const response = await axiosInstance.post("department/bulk-delete", deleteData);
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


export const activateDepartment = async (departmentId) => {
  const response = await axiosInstance.post(`department/${departmentId}/activate`);
  return response.data;
};

export const deactivateDepartment = async (departmentId) => {
  const response = await axiosInstance.post(`department/${departmentId}/deactivate`);
  return response.data;
};
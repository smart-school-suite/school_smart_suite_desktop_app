import axiosInstance from "../axios/authAxios";
import axiosUploadInstance from "../axios/axiosUploadInstance";
import { appendFormData } from "../utils/functions";

export const getHalls = async () => {
  const response = await axiosInstance.get("hall");
  return response.data;
};

export const getActiveHalls = async () => {
  const response = await axiosInstance.get("hall/active");
  return response.data;
};

export const createHall = async (data) => {
  const response = await axiosInstance.post("hall/create", data);
  return response.data;
};

export const deleteHall = async (hallId) => {
  const response = await axiosInstance.delete(`hall/delete/${hallId}`);
  return response.data;
};

export const updateHall = async (hallId, data) => {
  const response = await axiosInstance.put(`hall/update/${hallId}`, data);
  return response.data;
};

export const deactivateHall = async (hallId) => {
  const response = await axiosInstance.post(`hall/${hallId}/deactivate`);
  return response.data;
};

export const activateHall = async (hallId) => {
  const response = await axiosInstance.post(`hall/${hallId}/activate`);
  return response.data;
};

export const getHallTypes = async () => {
  const response = await axiosInstance.get("hall-type/active");
  return response.data;
};

export const getHallDetail = async (hallId) => {
  const response = await axiosInstance.get(`hall/${hallId}`);
  return response.data;
};

export const importHall = async (payload) => {
  const formData = new FormData();
  formData.append("file", payload.file, payload.file.name);
  appendFormData(formData, payload.mapping, "mapping");
  const response = await axiosUploadInstance.post(
    "hall/import",
    formData,
  );
  return response.data;
};

export const bulkDeleteHall = async (deleteData) => {
  const response = await axiosInstance.post("hall/bulk-delete", deleteData);
  return response.data;
};

export const bulkActivateHall = async (activateData) => {
  const response = await axiosInstance.post("hall/bulk-activate", activateData);
  return response.data;
};

export const bulkDeactivateHall = async (deactivateData) => {
  const response = await axiosInstance.post(
    "hall/bulk-deactivate",
    deactivateData,
  );
  return response.data;
};

export const bulkUpdateHall = async (updates) => {
  const response = await axiosInstance.patch("hall/bulk-update", updates);
  return response.data;
};

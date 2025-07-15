import axiosInstance from "../axios/authAxios";


export const createSpecialty = async (data) => {
  const response = await axiosInstance.post("specialty", data);
  return response.data;
};

export const getSpecialties = async () => {
  const response = await axiosInstance.get("specialty");
  return response.data;
};

export const bulkActivateSpecialty = async (specialtyData) => {
  const response = await axiosInstance.post("specialty/bulk-activate", specialtyData);
  return response.data;
};

export const bulkDeactivateSpecialty = async (specialtyData) => {
  const response = await axiosInstance.post("specialty/bulk-deactivate", specialtyData);
  return response.data;
};

export const bulkDeleteSpecialty = async (specialtyData) => {
  const response = await axiosInstance.post("specialty/bulk-delete", specialtyData);
  return response.data;
};

export const bulkUpdateSpecialty = async (updates) => {
  const response = await axiosInstance.patch("specialty/bulk-update", updates);
  return response.data;
};

export const getSpecialtyDetails = async (specialtyId) => {
  const response = await axiosInstance.get(`specialty/${specialtyId}`);
  return response.data;
};

export const updateSpecialty = async (specialtyId, data) => {
  const response = await axiosInstance.put(`specialty/${specialtyId}`, data);
  return response.data;
};

export const deleteSpecialty = async (specialtyId) => {
  const response = await axiosInstance.delete(`specialty/${specialtyId}`);
  return response.data;
};

export const activateSpecialty = async (specialtyId) => {
  const response = await axiosInstance.post(`specialty/${specialtyId}/activate`);
  return response.data;
};

export const deactivateSpecialty = async (specialtyId, data={}) => {
  const response = await axiosInstance.post(`specialty/${specialtyId}/deactivate`, data);
  return response.data;
};
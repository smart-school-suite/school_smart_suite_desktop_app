import axiosInstance from "../axios/authAxios";

export const assignSpecialtyHall = async (data) => {
  const response = await axiosInstance.post("specialty-hall/assign", data);
  return response.data;
};

export const removeAssignedHall = async (data) => {
  const response = await axiosInstance.post("specialty-hall/remove/assigned", data);
  return response.data;
};

export const getAssignedHalls = async (specialtyId) => {
  const response = await axiosInstance.get(
    `specialty-hall/hall-assigned/${specialtyId}`
  );
  return response.data;
};

export const getAssignableHalls = async (specialtyId) => {
  const response = await axiosInstance.get(
    `specialty-hall/hall-unassigned/${specialtyId}`
  );
  return response.data;
};

export const removeAllAssignedHalls = async (specialtyId) => {
  const response = await axiosInstance.delete(
    `specialty-hall/delete/${specialtyId}`
  );
  return response.data;
};

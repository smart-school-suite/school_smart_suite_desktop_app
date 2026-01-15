import axiosInstance from "../axios/authAxios";

export const assignSpecialtyHall = async (data) => {
  const response = await axiosInstance.post("specialty-hall/create", data);
  return response.data;
};

export const removeAssignedHall = async () => {
  const response = await axiosInstance.delete(
    "/specialty-hall/delete/{specialtyHallId}"
  );
  return response.data;
};

export const getAssignedHalls = async () => {
  const response = await axiosInstance.get(
    `specialty-hall/hall-assigned/${specialtyId}`
  );
  return response.data;
};

export const getAssignableHalls = async () => {
  const response = await axiosInstance.get(
    `specialty-hall/hall-unassigned/${specialtyId}`
  );
  return response.data;
};

import axiosInstance from "../axios/authAxios";

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
  const response = await axiosInstance.delete(`hall/${hallId}/delete`);
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

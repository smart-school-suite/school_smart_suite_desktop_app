import axiosInstance from "../axios/authAxios";


export const assignHeadOfSpecialty = async (data) => {
  const response = await axiosInstance.post("hos", data);
  return response.data;
};

export const getAllHos = async () => {
  const response = await axiosInstance.get("hos/all-hos");
  return response.data;
};

export const bulkRemoveHos = async (removeHosData) => {
  const response = await axiosInstance.delete("hos/bulk-remove", removeHosData);
  return response.data;
};

export const getHosDetails = async (hosId) => {
  const response = await axiosInstance.get(`hos/${hosId}`);
  return response.data;
};

export const removeHeadOfSpecialty = async (hosId) => {
  const response = await axiosInstance.delete(`hos/${hosId}`);
  return response.data;
};

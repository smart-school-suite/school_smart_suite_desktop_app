import axiosInstance from "../axios/authAxios";

export const getQualifications = async () => {
  const response = await axiosInstance.get("qualification/all");
  return response.data;
};

import axiosInstance from "../axios/authAxios";

export const getActiveGenders = async () => {
  const response = await axiosInstance.get("gender/active");
  return response.data;
};

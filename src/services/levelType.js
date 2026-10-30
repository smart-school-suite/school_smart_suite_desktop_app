import axiosInstance from "../axios/authAxios";

export const getLevelTypes = async () => {
  const response = await axiosInstance.get("level-type");
  return response.data;
};

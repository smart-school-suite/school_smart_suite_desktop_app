import axiosInstance from "../axios/authAxios";

export const getExamType = async () => {
  const response = await axiosInstance.get("exam-type");
  return response.data;
}
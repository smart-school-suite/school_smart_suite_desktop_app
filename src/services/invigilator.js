import axiosInstance from "../axios/authAxios";

export const assignInvigilators = async (payload) => {
  const response = await axiosInstance.post("invigilator/assign", payload);
  return response.data;
};

export const getPotentialInvigilators = async (examId) => {
  const response = await axiosInstance.get(
    `invigilator/exam/${examId}/potential`,
  );
  return response.data;
};

export const removeInvigilator = async (payload) => {
  const response = await axiosInstance.post("invigilator/remove", payload);
  return response.data;
};

export const getInvigilators = async (examId) => {
  const response = await axiosInstance.get(`invigilator/exam/${examId}`);
  return response.data;
};

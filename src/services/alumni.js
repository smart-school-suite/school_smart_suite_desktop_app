import axiosInstance from "../axios/authAxios";

export const getAlumni = async () => {
  const response = await axiosInstance.get("alumni");
  return response.data;
};

export const getAlumnusDetails = async (alumusId) => {
  const response = await axiosInstance.get(`alumni/${alumusId}/details`);
  return response.data;
};

export const reinstateAlumnus = async (alumusId) => {
  const response = await axiosInstance.get(`alumni/${alumusId}/reinstate`);
  return response.data;
};

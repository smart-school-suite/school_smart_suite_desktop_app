import axiosInstance from "../axios/authAxios";


export const assignHeadOfDepartment = async (data) => {
  const response = await axiosInstance.post("hod", data);
  return response.data;
};

export const getAllHods = async () => {
  const response = await axiosInstance.get("hod/all-hods");
  return response.data;
};


export const bulkRemoveHod = async (removeHodData) => {
  const response = await axiosInstance.delete("hod/bulk-remove", removeHodData);
  return response.data;
};


export const getHodDetails = async (hodId) => {
  const response = await axiosInstance.get(`hod/${hodId}`);
  return response.data;
};


export const removeHod = async (hodId) => {
  const response = await axiosInstance.delete(`hod/${hodId}`);
  return response.data;
};
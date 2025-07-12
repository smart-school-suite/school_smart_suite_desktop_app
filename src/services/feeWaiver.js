import axiosInstance from "../axios/authAxios";


export const createFeeWaiver = async (data) => {
  const response = await axiosInstance.post("fee-waiver", data);
  return response.data;
};


export const getAllFeeWaivers = async () => {
  const response = await axiosInstance.get("fee-waiver");
  return response.data;
};


export const updateFeeWaiver = async (feeWaiverId, data) => {
  const response = await axiosInstance.put(`fee-waiver/${feeWaiverId}`, data);
  return response.data;
};


export const deleteFeeWaiver = async (feeWaiverId) => {
  const response = await axiosInstance.delete(`fee-waiver/${feeWaiverId}`);
  return response.data;
};
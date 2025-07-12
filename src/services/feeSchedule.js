import axiosInstance from "../axios/authAxios";


export const getFeeSchedule = async () => {
  const response = await axiosInstance.get("fee-schedule");
  return response.data;
};

export const createFeeScheduleSlots = async (feeScheduleId, data) => {
  const response = await axiosInstance.post(`fee-schedule/slot/create/${feeScheduleId}`, data);
  return response.data;
};

export const updateFeeScheduleSlots = async (feeScheduleId, data) => {
  const response = await axiosInstance.put(`fee-schedule/slot/update/${feeScheduleId}`, data);
  return response.data;
};


export const deleteFeeSchedule = async (feeScheduleId) => {
  const response = await axiosInstance.delete(`fee-schedule/${feeScheduleId}`);
  return response.data;
};

export const getFeeScheduleSlots = async (feeScheduleId) => {
  const response = await axiosInstance.get(`fee-schedule/${feeScheduleId}/slots`);
  return response.data;
};
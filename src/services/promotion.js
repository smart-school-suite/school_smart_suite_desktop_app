import axiosInstance from "../axios/authAxios";

export const getPromotionRuns = async () => {
  const response = await axiosInstance.get("promotion-run");
  return response.data;
};

export const getPromotionRunDetails = async (runId) => {
  const response = await axiosInstance.get(`promotion-run/${runId}`);
  return response.data;
};

export const getPromotionRunLog = async (runId) => {
  const response = await axiosInstance.get(`promotion-run/${runId}/log`);
  return response.data;
};

export const cancelPromotionRun = async (runId) => {
  const response = await axiosInstance.post(`promotion-run/${runId}/cancel`);
  return response.data;
};

export const retryPromotionRun = async (runId) => {
  const response = await axiosInstance.post(`promotion-run/${runId}/retry`);
  return response.data;
};

export const triggerPromotionRun = async (payload) => {
  const response = await axiosInstance.post("promotion-run/trigger", payload);
  return response.data;
};

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

// Bulk actions: each applies to the selected runs whose status allows it and
// returns { action, done: [...], skipped: [{ id, name, reason }] }.
export const bulkTriggerPromotionRuns = async (payload) => {
  const response = await axiosInstance.post("promotion-run/bulk-trigger", payload);
  return response.data;
};

export const bulkRetryPromotionRuns = async (payload) => {
  const response = await axiosInstance.post("promotion-run/bulk-retry", payload);
  return response.data;
};

export const bulkCancelPromotionRuns = async (payload) => {
  const response = await axiosInstance.post("promotion-run/bulk-cancel", payload);
  return response.data;
};

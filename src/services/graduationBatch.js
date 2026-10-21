import axiosInstance from "../axios/authAxios";

export const getGraduationBatches = async () => {
  const response = await axiosInstance.get("graduation-batch");
  return response.data;
};

export const getGraduationBatchDetails = async (batchId, payload) => {
  const response = await axiosInstance.get(
    `graduation-batch/${batchId}/details`,
    payload,
  );
  return response.data;
};

export const updateGraduationBatch = async (payload, batchId) => {
  const response = await axiosInstance.put(
    `graduation-batch/${batchId}/update`,
    payload,
  );
  return response.data;
};

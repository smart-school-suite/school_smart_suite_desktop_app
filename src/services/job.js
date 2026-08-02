import axiosInstance from "../axios/authAxios";

export const getJobs = async (payload) => {
  const response = await axiosInstance.post("system-jobs/jobs", payload);
  return response.data;
};

export const getJobDetails = async (jobId) => {
  const response = await axiosInstance.get(`system-jobs/${jobId}`);
  return response.data;
};

export const deleteJob = async (jobId) => {
  const response = await axiosInstance.delete(`system-jobs/${jobId}/delete`);
  return response.data;
};

export const getJobErrors = async (jobId) => {
  const response = await axiosInstance.get(`system-jobs/${jobId}/errors`);
  return response.data;
};

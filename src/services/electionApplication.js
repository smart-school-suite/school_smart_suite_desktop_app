import axiosInstance from "../axios/authAxios";

export const getElectionApplications = async (params = {}) => {
  const response = await axiosInstance.get("election-application", { params });
  return response.data;
};

export const getApplicationDetails = async (applicationId) => {
  const response = await axiosInstance.get(`election-application/${applicationId}`);
  return response.data;
};

export const approveApplication = async ({ applicationId, remarks }) => {
  const response = await axiosInstance.put(`election-application/${applicationId}/approve`, { remarks });
  return response.data;
};

export const rejectApplication = async ({ applicationId, remarks }) => {
  const response = await axiosInstance.put(`election-application/${applicationId}/reject`, { remarks });
  return response.data;
};

export const bulkApproveApplications = async (data) => {
  const response = await axiosInstance.post("election-application/bulk-approve", data);
  return response.data;
};

export const bulkRejectApplications = async (data) => {
  const response = await axiosInstance.post("election-application/bulk-reject", data);
  return response.data;
};

export const deleteApplication = async (applicationId) => {
  const response = await axiosInstance.delete(`election-application/${applicationId}`);
  return response.data;
};

export const bulkDeleteApplications = async (data) => {
  const response = await axiosInstance.post("election-application/bulk-delete", data);
  return response.data;
};

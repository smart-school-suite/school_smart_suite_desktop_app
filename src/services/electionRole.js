import axiosInstance from "../axios/authAxios";

// Election positions (stored as election roles) and their office terms.
export const getElectionRoles = async (params = {}) => {
  const response = await axiosInstance.get("election-role", { params });
  return response.data;
};

export const getElectionRolesByElection = async (electionId) => {
  const response = await axiosInstance.get(`election-role/elections/${electionId}/roles`);
  return response.data;
};

export const getActiveElectionRolesByElection = async (electionId) => {
  const response = await axiosInstance.get(`election-role/election/${electionId}/active-roles`);
  return response.data;
};

export const getElectionRoleDetails = async (electionRoleId) => {
  const response = await axiosInstance.get(`election-role/${electionRoleId}`);
  return response.data;
};

export const createElectionRole = async (data) => {
  const response = await axiosInstance.post("election-role", data);
  return response.data;
};

export const updateElectionRole = async ({ electionRoleId, data }) => {
  const response = await axiosInstance.put(`election-role/${electionRoleId}`, data);
  return response.data;
};

export const bulkUpdateElectionRole = async (data) => {
  const response = await axiosInstance.patch("election-role/bulk-update", data);
  return response.data;
};

export const deleteElectionRole = async (electionRoleId) => {
  const response = await axiosInstance.delete(`election-role/${electionRoleId}`);
  return response.data;
};

export const bulkDeleteElectionRole = async (data) => {
  const response = await axiosInstance.post("election-role/bulk-delete", data);
  return response.data;
};

export const activateElectionRole = async (electionRoleId) => {
  const response = await axiosInstance.post(`election-role/${electionRoleId}/activate`);
  return response.data;
};

export const deactivateElectionRole = async (electionRoleId) => {
  const response = await axiosInstance.post(`election-role/${electionRoleId}/deactivate`);
  return response.data;
};

export const bulkActivateElectionRole = async (data) => {
  const response = await axiosInstance.post("election-role/bulk-activate", data);
  return response.data;
};

export const bulkDeactivateElectionRole = async (data) => {
  const response = await axiosInstance.post("election-role/bulk-deactivate", data);
  return response.data;
};

export const configureOfficeTerm = async ({ electionRoleId, data }) => {
  const response = await axiosInstance.put(`election-role/${electionRoleId}/office-term`, data);
  return response.data;
};

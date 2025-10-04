import axiosInstance from "../axios/authAxios";

export const createElectionRole = async (data) => {
  const response = await axiosInstance.post("election-role", data);
  return response.data;
};

export const getAllElectionRoles = async () => {
  const response = await axiosInstance.get("election-role");
  return response.data;
};

export const bulkActivateRole = async (roleData) => {
  const response = await axiosInstance.post("election-role/bulk-activate", roleData);
  return response.data;
};

export const bulkDeactivateRole = async (roleData) => {
  const response = await axiosInstance.post("election-role/bulk-deactivate", roleData);
  return response.data;
};

export const bulkDeleteRole = async (deleteData) => {
  const response = await axiosInstance.post("election-role/bulk-delete", deleteData);
  return response.data;
};


export const bulkUpdateElectionRole = async (updateData) => {
  const response = await axiosInstance.patch("election-role/bulk-update", updateData);
  return response.data;
};


export const getActiveRolesForElection = async (electionId) => {
  const response = await axiosInstance.get(`election-role/election/${electionId}/active-roles`);
  return response.data;
};


export const getElectionRoles = async () => {
  const response = await axiosInstance.get("election-role");
  return response.data;
};


export const updateElectionRole = async (electionRoleId, electionRoleData) => {
  const response = await axiosInstance.put(`election-role/${electionRoleId}`, electionRoleData);
  return response.data;
};


export const deleteElectionRole = async (electionRoleId) => {
  const response = await axiosInstance.delete(`election-role/${electionRoleId}`);
  return response.data;
};


export const activateRole = async (electionRoleId) => {
  const response = await axiosInstance.post(`election-role/${electionRoleId}/activate`);
  return response.data;
};


export const deactivateRole = async (electionRoleId) => {
  const response = await axiosInstance.post(`election-role/${electionRoleId}/deactivate`);
  return response.data;
};
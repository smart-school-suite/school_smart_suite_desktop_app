import axiosInstance from "../axios/authAxios";

export const createElectionType = async (data) => {
  const response = await axiosInstance.post("election/election-types", data);
  return response.data;
};

export const getElectionTypes = async () => {
  const response = await axiosInstance.get("election/election-types");
  return response.data;
};

export const updateElectionType = async (electionTypeId, data) => {
  const response = await axiosInstance.put(`election/election-types/${electionTypeId}`, data);
  return response.data;
};


export const deleteElectionType = async (electionTypeId) => {
  const response = await axiosInstance.delete(`election/election-types/${electionTypeId}`);
  return response.data;
};


export const activateElectionType = async (electionTypeId) => {
  const response = await axiosInstance.post(`election/election-types/${electionTypeId}/activate`);
  return response.data;
};


export const deactivateElectionType = async (electionTypeId) => {
  const response = await axiosInstance.post(`election/election-types/${electionTypeId}/deactivate`);
  return response.data;
};

export const getActiveElectionTypes = async () => {
  const response = await axiosInstance.get("election/active-election-types");
  return response.data;
};
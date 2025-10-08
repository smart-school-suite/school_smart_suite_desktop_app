import axiosInstance from "../axios/authAxios";

export const createElectionType = async (data) => {
  const response = await axiosInstance.post("election-type", data);
  return response.data;
};

export const getElectionTypes = async () => {
  const response = await axiosInstance.get("election-type");
  return response.data;
};

export const updateElectionType = async (electionTypeId, data) => {
  const response = await axiosInstance.put(`election-type/${electionTypeId}`, data);
  return response.data;
};


export const deleteElectionType = async (electionTypeId) => {
  const response = await axiosInstance.delete(`election-type/${electionTypeId}`);
  return response.data;
};


export const activateElectionType = async (electionTypeId) => {
  const response = await axiosInstance.post(`election-type/${electionTypeId}/activate`);
  return response.data;
};


export const deactivateElectionType = async (electionTypeId) => {
  const response = await axiosInstance.post(`election-type/${electionTypeId}/deactivate`);
  return response.data;
};

export const getActiveElectionTypes = async () => {
  const response = await axiosInstance.get("active-election-type");
  return response.data;
};

export const getElectionTypeDetails = async (electionTypeId) => {
  const response = await axiosInstance.get(`election-type/${electionTypeId}`);
  return response.data;
};
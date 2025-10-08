import axiosInstance from "../axios/authAxios";


export const createElection = async (createdata) => {
  const response = await axiosInstance.post("election", createdata);
  return response.data;
};

export const getElections = async () => {
  const response = await axiosInstance.get("election");
  return response.data;
};

export const bulkDeleteElection = async (deleteData) => {
  const response = await axiosInstance.post("election/bulk-delete", deleteData);
  return response.data;
};

export const bulkUpdateElection = async (updateData) => {
  const response = await axiosInstance.patch("election/bulk-update", updateData);
  return response.data;
};

export const getCurrentElectionWinners = async () => {
  const response = await axiosInstance.get("election/current-election-winners");
  return response.data;
};

export const getElectionDetails = async (electionId) => {
  const response = await axiosInstance.get(`election/election/${electionId}`);
  return response.data;
};

export const getElectionResults = async (electionId) => {
  const response = await axiosInstance.get(`election/election/${electionId}/results`);
  return response.data;
};

export const getPastElectionWinners = async () => {
  const response = await axiosInstance.get("election/past-election-winners");
  return response.data;
};


export const deleteElection = async (electionId) => {
  const response = await axiosInstance.delete(`election/${electionId}`);
  return response.data;
};

export const updateElection = async (electionId, data) => {
  const response = await axiosInstance.put(`election/${electionId}`, data);
  return response.data;
};

export const getAllowedParticipants = async (electionId) => {
  const response = await axiosInstance.get(`election/${electionId}/allowed-participants`);
  return response.data;
};


export const addAllowedParticipants = async (electionId, participantData) => {
  const response = await axiosInstance.post(`election/${electionId}/allowed-participants`, participantData);
  return response.data;
};


export const addAllowedParticipantsByElection = async (electionId, targetElectionId) => {
  const response = await axiosInstance.post(`election/${electionId}/allowed-participants/from/${targetElectionId}`);
  return response.data;
};


export const getElectionCandidates = async (electionId) => {
  const response = await axiosInstance.get(`election/${electionId}/candidates`);
  return response.data;
};

export const getElectionStats = async (year) => {
   const response = await axiosInstance.get(`election/stats/${year}`);
   return response.data;
}
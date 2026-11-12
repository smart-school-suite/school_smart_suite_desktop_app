import axiosInstance from "../axios/authAxios";

// ── Elections ────────────────────────────────────────────────────────
export const getElections = async (params = {}) => {
  const response = await axiosInstance.get("election", { params });
  return response.data;
};

export const getElectionDetails = async (electionId) => {
  const response = await axiosInstance.get(`election/${electionId}`);
  return response.data;
};

export const createElection = async (data) => {
  const response = await axiosInstance.post("election", data);
  return response.data;
};

export const updateElection = async ({ electionId, data }) => {
  const response = await axiosInstance.put(`election/${electionId}`, data);
  return response.data;
};

export const deleteElection = async (electionId) => {
  const response = await axiosInstance.delete(`election/${electionId}`);
  return response.data;
};

export const bulkDeleteElection = async (data) => {
  const response = await axiosInstance.post("election/bulk-delete", data);
  return response.data;
};

export const getPastElections = async () => {
  const response = await axiosInstance.get("election/past");
  return response.data;
};

export const getElectionHistory = async (params = {}) => {
  const response = await axiosInstance.get("election/history", { params });
  return response.data;
};

export const getElectionStats = async (year) => {
  const response = await axiosInstance.get(`election/stats/${year}`);
  return response.data;
};

// ── Lifecycle ────────────────────────────────────────────────────────
export const publishElection = async (electionId) => {
  const response = await axiosInstance.post(`election/${electionId}/publish`);
  return response.data;
};

export const cancelElection = async (electionId) => {
  const response = await axiosInstance.post(`election/${electionId}/cancel`);
  return response.data;
};

export const closeElectionVoting = async (electionId) => {
  const response = await axiosInstance.post(`election/${electionId}/close-voting`);
  return response.data;
};

// ── Participants (who can vote / who can apply) ──────────────────────
export const getElectionParticipants = async ({ electionId, params = {} }) => {
  const response = await axiosInstance.get(`election/${electionId}/participants`, { params });
  return response.data;
};

export const configureElectionParticipants = async ({ electionId, data }) => {
  const response = await axiosInstance.put(`election/${electionId}/participants`, data);
  return response.data;
};

export const refreshElectionParticipants = async (electionId) => {
  const response = await axiosInstance.post(`election/${electionId}/participants/refresh`);
  return response.data;
};

export const copyElectionParticipants = async ({ electionId, sourceElectionId }) => {
  const response = await axiosInstance.post(
    `election/${electionId}/participants/from/${sourceElectionId}`,
  );
  return response.data;
};

// ── Voting & results (derived from votes) ────────────────────────────
export const castVote = async (data) => {
  const response = await axiosInstance.post("election/cast-vote", data);
  return response.data;
};

export const getElectionResults = async (electionId) => {
  const response = await axiosInstance.get(`election/${electionId}/results`);
  return response.data;
};

export const publishElectionResults = async ({ electionId, data }) => {
  const response = await axiosInstance.post(`election/${electionId}/results/publish`, data);
  return response.data;
};

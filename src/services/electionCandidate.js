import axiosInstance from "../axios/authAxios";

export const getElectionCandidates = async (params = {}) => {
  const response = await axiosInstance.get("election-candidate", { params });
  return response.data;
};

export const getElectionCandidateDetails = async (candidateId) => {
  const response = await axiosInstance.get(`election-candidate/${candidateId}/details`);
  return response.data;
};

export const getElectionBallot = async (electionId) => {
  const response = await axiosInstance.get(`election-candidate/election/${electionId}/ballot`);
  return response.data;
};

export const disqualifyCandidate = async ({ candidateId, reason }) => {
  const response = await axiosInstance.post(`election-candidate/disqualify/${candidateId}`, { reason });
  return response.data;
};

export const reinstateCandidate = async (candidateId) => {
  const response = await axiosInstance.post(`election-candidate/reinstate/${candidateId}`);
  return response.data;
};

export const bulkDisqualifyCandidates = async (data) => {
  const response = await axiosInstance.post("election-candidate/bulk/disqualify", data);
  return response.data;
};

export const bulkReinstateCandidates = async (data) => {
  const response = await axiosInstance.post("election-candidate/bulk/reinstate", data);
  return response.data;
};

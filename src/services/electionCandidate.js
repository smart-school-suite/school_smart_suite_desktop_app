import axiosInstance from "../axios/authAxios";


export const getElectionCandidates = async () => {
  const response = await axiosInstance.get("election-candidate");
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

export const disqualifyCandidate = async (candidateId) => {
  const response = await axiosInstance.post(`election-candidate/disqualify/${candidateId}`);
  return response.data;
};

export const reinstateCandidate = async (candidateId) => {
  const response = await axiosInstance.post(`election-candidate/reinstate/${candidateId}`);
  return response.data;
};

export const getElectionCandidateDetails = async (candidateId) => {
  const response = await axiosInstance.get(`election-candidate/${candidateId}`);
  return response.data;
};

export const getCandidatesByElection = async (electionId) => {
  const response = await axiosInstance.get(`election-candidate/${electionId}`);
  return response.data;
};

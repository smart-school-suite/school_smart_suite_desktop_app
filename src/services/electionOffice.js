import axiosInstance from "../axios/authAxios";

// Office holders (elected, appointed, replacement) and tenure history.
export const getOfficeHolders = async (params = {}) => {
  const response = await axiosInstance.get("election-office/holders", { params });
  return response.data;
};

export const getCurrentOfficeHolders = async () => {
  const response = await axiosInstance.get("election-office/holders/current");
  return response.data;
};

export const getOfficeHolderDetails = async (holderId) => {
  const response = await axiosInstance.get(`election-office/holders/${holderId}`);
  return response.data;
};

export const appointOfficeHolder = async (data) => {
  const response = await axiosInstance.post("election-office/holders/appoint", data);
  return response.data;
};

export const replaceOfficeHolder = async ({ holderId, data }) => {
  const response = await axiosInstance.post(`election-office/holders/${holderId}/replace`, data);
  return response.data;
};

export const terminateOfficeHolder = async ({ holderId, data }) => {
  const response = await axiosInstance.post(`election-office/holders/${holderId}/terminate`, data);
  return response.data;
};

export const getParticipantElectionHistory = async ({ participantType, participantId }) => {
  const response = await axiosInstance.get(
    `election-office/history/${participantType}/${participantId}`,
  );
  return response.data;
};

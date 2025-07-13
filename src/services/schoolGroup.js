import axiosInstance from "../axios/authAxios";


export const addAudienceGroupMembers = async (data) => {
  const response = await axiosInstance.post("school-group/add", data);
  return response.data;
};


export const getAudienceGroups = async () => {
  const response = await axiosInstance.get("school-group/audience-groups");
  return response.data;
};

export const createAudienceGroup = async (data) => {
  const response = await axiosInstance.post("school-group/create", data);
  return response.data;
};

export const removeAudienceGroupMembers = async (data) => {
  const response = await axiosInstance.post("school-group/remove", data);
  return response.data;
};

export const updateAudienceGroup = async (schoolSetAudienceGroupId, data) => {
  const response = await axiosInstance.put(`school-group/${schoolSetAudienceGroupId}`, data);
  return response.data;
};

export const deleteAudienceGroup = async (schoolSetAudienceGroupId) => {
  const response = await axiosInstance.delete(`school-group/${schoolSetAudienceGroupId}`);
  return response.data;
};

export const getAudienceGroupMembers = async (schoolSetAudienceGroupId) => {
  const response = await axiosInstance.get(`school-group/${schoolSetAudienceGroupId}`);
  return response.data;
};
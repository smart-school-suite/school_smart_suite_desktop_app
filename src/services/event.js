import axiosInstance from "../axios/authAxios";


export const getAllEventCategories = async () => {
  const response = await axiosInstance.get("event-category");
  return response.data;
};

export const activateEventCategory = async (categoryId) => {
  const response = await axiosInstance.post(`event-category/activate/${categoryId}`);
  return response.data;
};

export const createEventCategory = async (data) => {
  const response = await axiosInstance.post("event-category/create", data);
  return response.data;
};

export const deactivateEventCategory = async (categoryId) => {
  const response = await axiosInstance.post(`event-category/deactivate/${categoryId}`);
  return response.data;
};

export const deleteEventCategory = async (categoryId) => {
  const response = await axiosInstance.delete(`event-category/delete/${categoryId}`);
  return response.data;
};

export const updateEventCategory = async (categoryId, updateData) => {
  const response = await axiosInstance.put(`event-category/update/${categoryId}`, updateData);
  return response.data;
};

export const getEventCategoryByStatus = async (status) => {
  const response = await axiosInstance.get(`event-category/${status}`);
  return response.data;
};


export const createEventTag = async (data) => {
  const response = await axiosInstance.post("event-tag", data);
  return response.data;
};

export const getEventTags = async () => {
  const response = await axiosInstance.get("event-tag");
  return response.data;
};

export const updateEventTag = async (tagId, data) => {
  const response = await axiosInstance.put(`event-tag/${tagId}`, data);
  return response.data;
};

export const deleteEventTag = async (tagId) => {
  const response = await axiosInstance.delete(`event-tag/${tagId}`);
  return response.data;
};
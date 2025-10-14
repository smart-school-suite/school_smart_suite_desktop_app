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

export const getEventCategories = async () => {
   const response = await axiosInstance.get("event-category");
   return response.data;
}

export const getActiveEventCategories = async () => { 
   const response = await axiosInstance.get("event-category/active");
   return response.data;
}

export const getEventCategoryDetails = async (eventCategoryId) => {
  const response = await axiosInstance.get(`event-category/details/${eventCategoryId}`);
  return response.data;
}
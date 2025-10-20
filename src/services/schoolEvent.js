import axiosInstance from "../axios/authAxios";

export const getSchoolEvents = async () => {
  const response = await axiosInstance.get("school-event");
  return response.data;
};

export const createSchoolEvent = async (data) => {
  const response = await axiosInstance.post("school-event/create", data);
  return response.data;
};

export const deleteSchoolEvent = async (eventId) => {
  const response = await axiosInstance.delete(`school-event/delete/${eventId}`);
  return response.data;
};

export const getSchoolEventDetails = async (eventCategoryId) => {
  const response = await axiosInstance.get(`school-event/details/${eventCategoryId}`);
  return response.data;
};

export const updateSchoolEventContent = async (schoolEventId, data) => {
  const response = await axiosInstance.patch(`school-event/update/content/${schoolEventId}`, data);
  return response.data;
};

export const getSchoolEventByCategory = async (eventCategoryId) => {
  const response = await axiosInstance.get(`school-event/event-category/${eventCategoryId}`);
  return response.data;
};

export const getEventTags = async () => {
   const response = await axiosInstance.get("event-tag");
   return response.data;
}

export const likeSchoolEvent = async (schoolEventId, data={}) => {
   const response = await axiosInstance.post(`school-event/${schoolEventId}/like`, data);
   return response.data;
}

export const getExpiredSchoolEventsByCategory = async (eventCategoryId) => {
   const response = await axiosInstance.get(`school-event/expired/event-category/${eventCategoryId}`);
   return response.data;
}

export const getExpiredSchoolEvents = async () => { 
   const response = await axiosInstance.get("school-event/expired");
   return response.data;
}

export const getScheduledSchoolEvents = async () => {
    const response = await axiosInstance.get("school-event/scheduled");
    return response.data;
}

export const getScheduledSchoolEventsByCategory = async (eventCategoryId) => {
    const response = await axiosInstance.get(`school-event/scheduled/event-category/${eventCategoryId}`);
    return response.data;
}

export const getDraftSchoolEvents = async () => {
    const response = await axiosInstance.get("school-event/draft");
    return response.data;
}

export const getDraftSchoolEventsByCategory = async (eventCategoryId) => {
    const response = await axiosInstance.get(`school-event/draft/event-category/${eventCategoryId}`);
    return response.data;
}

export const updateDraftSchoolEvent = async (data) => { 
   const response = await axiosInstance.patch("school-event/draft/update", data);
   return response.data;
}
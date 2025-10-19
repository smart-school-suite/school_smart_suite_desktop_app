import axiosInstance from "../axios/authAxios";

export const getSchoolEvents = async () => {
  const response = await axiosInstance.get("school-event");
  return response.data;
};

export const getSchoolEventSettings = async () => {
  const response = await axiosInstance.get("school-event-setting");
  return response.data;
};

export const updateSchoolEventSetting = async (settingId, data) => {
  const response = await axiosInstance.put(`school-event-setting/${settingId}`, data);
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
  const response = await axiosInstance.get(`school-event/${eventCategoryId}`);
  return response.data;
};

export const updateSchoolEventStatus = async (eventId, data) => {
  const response = await axiosInstance.patch(`school-event/draft/status/update/${eventId}`, data);
  return response.data;
};

export const getSchoolEventByStatus = async (status) => {
  const response = await axiosInstance.get(`school-event/status/${status}`);
  return response.data;
};

export const updateSchoolEventContent = async (eventId, data) => {
  const response = await axiosInstance.patch(`school-event/update/content/${eventId}`, data);
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
import axiosInstance from "../axios/authAxios";
import { appendFormData } from "../utils/functions";

const toFormData = (data, method) => {
  const formData = new FormData();
  appendFormData(formData, data);
  if (method) {
    formData.append("_method", method);
  }
  return formData;
};

export const getSchoolEvents = async () => {
  const response = await axiosInstance.get("school-event");
  return response.data;
};

export const getSchoolEventsByStatus = async (status) => {
  const response = await axiosInstance.get(`school-event/status/${status}`);
  return response.data;
};

export const getSchoolEventSummary = async () => {
  const response = await axiosInstance.get("school-event/stats/summary");
  return response.data;
};

export const createSchoolEvent = async (data) => {
  const response = await axiosInstance.post(
    "school-event/create",
    toFormData(data),
  );
  return response.data;
};

export const deleteSchoolEvent = async (eventId) => {
  const response = await axiosInstance.delete(`school-event/${eventId}`);
  return response.data;
};

export const getSchoolEventDetails = async (schoolEventId) => {
  const response = await axiosInstance.get(
    `school-event/details/${schoolEventId}`,
  );
  return response.data;
};

export const updateSchoolEventContent = async (schoolEventId, data) => {
  const response = await axiosInstance.post(
    `school-event/update/content/${schoolEventId}`,
    toFormData(data),
  );
  return response.data;
};

export const getSchoolEventByCategory = async (eventCategoryId) => {
  const response = await axiosInstance.get(
    `school-event/event-category/${eventCategoryId}`,
  );
  return response.data;
};

export const getEventTags = async () => {
  const response = await axiosInstance.get("event-tag");
  return response.data;
};

export const likeSchoolEvent = async (schoolEventId, data = {}) => {
  const response = await axiosInstance.post(
    `school-event/${schoolEventId}/like`,
    data,
  );
  return response.data;
};

export const getExpiredSchoolEventsByCategory = async (eventCategoryId) => {
  const response = await axiosInstance.get(
    `school-event/expired/event-category/${eventCategoryId}`,
  );
  return response.data;
};

export const getExpiredSchoolEvents = async () => {
  const response = await axiosInstance.get("school-event/expired");
  return response.data;
};

export const getScheduledSchoolEvents = async () => {
  const response = await axiosInstance.get("school-event/scheduled");
  return response.data;
};

export const getScheduledSchoolEventsByCategory = async (eventCategoryId) => {
  const response = await axiosInstance.get(
    `school-event/scheduled/event-category/${eventCategoryId}`,
  );
  return response.data;
};

export const getDraftSchoolEvents = async () => {
  const response = await axiosInstance.get("school-event/draft");
  return response.data;
};

export const getDraftSchoolEventsByCategory = async (eventCategoryId) => {
  const response = await axiosInstance.get(
    `school-event/draft/event-category/${eventCategoryId}`,
  );
  return response.data;
};

export const updateDraftSchoolEvent = async (data) => {
  const response = await axiosInstance.post(
    "school-event/draft/update",
    toFormData(data, "PATCH"),
  );
  return response.data;
};

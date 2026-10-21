import axiosInstance from "../axios/authAxios";

export const getPromotionRecords = async () => {
  const response = await axiosInstance.get("student-promotion-record");
  return response.data;
};

export const getNextSpecialty = async (specialtyId) => {
  const response = await axiosInstance.get(
    `student-promotion-record/specialty/${specialtyId}/next-specialty`,
  );
  return response.data;
};

export const getRecordDetails = async (recordId) => {
  const response = await axiosInstance.get(
    `student-promotion-record/${recordId}/details`,
  );
  return response.data;
};

export const getPromotionRecordLogs = async (recordId) => {
  const response = await axiosInstance.get(
    `student-promotion-record/${recordId}/log`,
  );
  return response.data;
};

export const approvePromotion = async (payload) => {
  const response = await axiosInstance.post(
    "student-promotion-record/promote",
    payload
  );
  return response.data;
};

export const approveRepeat = async (payload) => {
  const response = await axiosInstance.post(
    "student-promotion-record/repeat",
    payload
  );
  return response.data;
};

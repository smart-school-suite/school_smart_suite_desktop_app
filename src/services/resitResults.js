import axiosInstance from "../axios/authAxios";

export const getResitResultExams = async () => {
  const response = await axiosInstance.get("resit-results/resit-exams");
  return response.data;
};

export const publishResitResult = async (payload) => {
  const response = await axiosInstance.post("resit-results/publish", payload);
  return response.data;
};

export const getResitResultProgress = async (resitExamId) => {
  const response = await axiosInstance.get(`resit-results/resit-exam/${resitExamId}/progress`);
  return response.data;
};

export const getResitResultPublishDetails = async (resitExamId) => {
  const response = await axiosInstance.get(`resit-results/resit-exam/${resitExamId}/publish-details`);
  return response.data;
};

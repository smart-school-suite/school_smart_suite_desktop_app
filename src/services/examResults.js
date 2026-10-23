import axiosInstance from "../axios/authAxios";

export const getExams = async () => {
  const response = await axiosInstance.get("exam-results/exams");
  return response.data;
};

export const publishExamResult = async (payload) => {
  const response = await axiosInstance.post("exam-results/publish", payload);
  return response.data;
};

export const getExamResultProgress = async (examId) => {
  const response = await axiosInstance.get(
    `exam-results/exam/${examId}/progress`,
  );
  return response.data;
};

export const getExamStandings = async (examId) => {
  const response = await axiosInstance.get(
    `exam-results/exam/${examId}/standing`,
  );
  return response.data;
};

export const getExamPublishDetails = async (examId) => {
  const response = await axiosInstance.get(
    `exam-results/exam/${examId}/publish-details`,
  );
  return response.data;
};

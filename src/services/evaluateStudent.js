import axiosInstance from "../axios/authAxios";


export const createCaMark = async (data) => {
  const response = await axiosInstance.post("mark/ca-scores", data);
  return response.data;
};

export const updateCaMark = async (data) => {
  const response = await axiosInstance.put("mark/ca-scores", data);
  return response.data;
};

export const createExamMark = async (data) => {
  const response = await axiosInstance.post("mark/exam-scores", data);
  return response.data;
};

export const updateExamMark = async (data) => {
  const response = await axiosInstance.put("mark/exam-scores", data);
  return response.data;
};

export const getAccessedCoursesWithLettergrades = async (examId) => {
  const response = await axiosInstance.get(`mark/exams/${examId}/accessed-courses`);
  return response.data;
};

export const prepareCaData = async (examId, studentId) => {
  const response = await axiosInstance.get(`mark/exams/${examId}/students/${studentId}/ca-data/prepare`);
  return response.data;
};


export const prepareExamData = async (examId, studentId) => {
  const response = await axiosInstance.get(`mark/exams/${examId}/students/${studentId}/exam-data/prepare`);
  return response.data;
};


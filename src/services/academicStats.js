import axiosInstance from "../axios/authAxios";


export const getCaExamStats = async (examId) => {
  const response = await axiosInstance.get(`academic-stats/ca-exam/${examId}`);
  return response.data;
};

export const getExamStats = async (examId) => {
  const response = await axiosInstance.get(`academic-stats/exam/${examId}`);
  return response.data;
};

export const getStudentExamStandings = async (examId) => {
  const response = await axiosInstance.get(`academic-stats/exam/${examId}/standings`);
  return response.data;
};

export const getSchoolAcademicStats = async (year) => {
  const response = await axiosInstance.get(`academic-stats/${year}`);
  return response.data;
};
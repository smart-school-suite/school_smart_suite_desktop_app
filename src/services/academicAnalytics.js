import axiosInstance from "../axios/authAxios";

export const getCardStats = async (year) => {
  const response = await axiosInstance.get(`academic-stats/card-stats/${year}`);
  return response.data;
};

export const getExamTypeAverageGpa = async (year) => {
  const response = await axiosInstance.get(
    `academic-stats/exam-type/average-gpa/${year}`
  );
  return response.data;
};

export const getExamTypeFailRate = async (year) => {
  const response = await axiosInstance.get(
    `academic-stats/exam-type/fail-rate/${year}`
  );
  return response.data;
};

export const getExamTypeGradeDistribution = async (year) => {
  const response = await axiosInstance.get(
    `academic-stats/exam-type/grade-distribution/${year}`
  );
  return response.data;
};

export const getExamTypePassRate = async (year) => {
  const response = await axiosInstance.get(
    `academic-stats/exam-type/pass-rate/${year}`
  );
  return response.data;
};

export const getExamTypeResitTotal = async (year) => {
  const response = await axiosInstance.get(
    `academic-stats/exam-type/resit-total/${year}`
  );
  return response.data;
};

export const getLevelAverageGpa = async (year) => {
  const response = await axiosInstance.get(
    `academic-stats/level/average-gpa/${year}`
  );
  return response.data;
};

export const getLevelFailRate = async (year) => {
  const response = await axiosInstance.get(
    `academic-stats/level/fail-rate/${year}`
  );
  return response.data;
};

export const getLevelGradeDistribution = async (year) => {
  const response = await axiosInstance.get(
    `academic-stats/level/grade-distribution/${year}`
  );
  return response.data;
};

export const getLevelPassRate = async (year) => {
  const response = await axiosInstance.get(
    `academic-stats/level/pass-rate/${year}`
  );
  return response.data;
};

export const getLevelResitTotal = async (year) => {
  const response = await axiosInstance.get(
    `academic-stats/level/resit-total/${year}`
  );
  return response.data;
};

export const getResitSuccessRate = async (year) => {
  const response = await axiosInstance.get(
    `academic-stats/resit/success-rate/${year}`
  );
  return response.data;
};

export const getSchoolAverageGpa = async (year) => {
  const response = await axiosInstance.get(
    `academic-stats/school/average-gpa/${year}`
  );
  return response.data;
};

export const getSchoolFailRate = async (year) => {
  const response = await axiosInstance.get(
    `academic-stats/school/fail-rate/${year}`
  );
  return response.data;
};

export const getSchoolGradeDistribution = async (year) => {
  const response = await axiosInstance.get(
    `academic-stats/school/grade-distribution/${year}`
  );
  return response.data;
};

export const getSchoolPassRate = async (year) => {
  const response = await axiosInstance.get(
    `academic-stats/school/pass-rate/${year}`
  );
  return response.data;
};

export const getSchoolResitTotal = async (year) => {
  const response = await axiosInstance.get(
    `academic-stats/school/resit-total/${year}`
  );
  return response.data;
};

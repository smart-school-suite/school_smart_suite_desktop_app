import axiosInstance from "../axios/authAxios";

export const getCardStats = async () => {
  const response = await axiosInstance.get("operational-stats/card-stats");
  return response.data;
};

export const getStudentDropoutRateLevel = async (year) => {
  const response = await axiosInstance.get(
    `operational-stats/student-dropout/rate/level/${year}`
  );
  return response.data;
};

export const getStudentDropoutRate = async (year) => {
  const response = await axiosInstance.get(
    `operational-stats/student-dropout/rate/${year}`
  );
  return response.data;
};

export const getStudentLevelRegistration = async (year) => {
  const response = await axiosInstance.get(
    `operational-stats/student-registration/level/${year}`
  );
  return response.data;
};

export const getStudentRegistration = async (year) => {
  const response = await axiosInstance.get(
    `operational-stats/student-registration/${year}`
  );
  return response.data;
};

export const getStudentRetentionRate = async () => {
  const response = await axiosInstance.get(
    `operational-stats/student-retention/rate`
  );
  return response.data;
};

export const getStudentLevelRetentionRate = async () => {
  const response = await axiosInstance.get(
    `operational-stats/student-retention/rate/level/${year}`
  );
  return response.data;
};

export const getStudentRegistrationSource = async (year) => {
  const response = await axiosInstance.get(
    `operational-stats/student/registration-source/${year}`
  );
  return response.data;
};

export const getTotalStudents = async () => {
  const response = await axiosInstance.get(`operational-stats/student/total`);
  return response.data;
};

export const getTeacherRetentionRate = async () => {
  const response = await axiosInstance.get(
    `operational-stats/teacher-retention/rate`
  );
  return response.data;
};

export const getTeacherStudentRatio = async () => {
  const response = await axiosInstance.get(
    `operational-stats/teacher-student/ratio`
  );
  return response.data;
};

export const getTeacherStudentRatioLevel = async () => {
  const response = await axiosInstance.get(
    "operational-stats/teacher-student/ratio/level"
  );
  return response.data;
};

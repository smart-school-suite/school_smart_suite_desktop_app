import axiosInstance from "../axios/authAxios";

export const getSchoolAdminAudience = async () => {
  const response = await axiosInstance.get("audience/school-admin");
  return response.data;
};

export const getStudentAudience = async () => {
  const response = await axiosInstance.get("audience/student");
  return response.data;
};

export const getStudentAudienceByDepartment = async () => {
  const response = await axiosInstance.get("audience/student/department");
  return response.data;
};

export const getStudentAudienceByLevel = async () => {
  const response = await axiosInstance.get("audience/student/level");
  return response.data;
};

export const getStudentAudienceBySpecialty = async () => {
  const response = await axiosInstance.get("audience/student/specialty");
  return response.data;
};

export const getAudienceSummary = async () => {
  const response = await axiosInstance.get("audience/summary");
  return response.data;
};

export const getTeacherAudienceByDepartment = async () => {
  const response = await axiosInstance.get("audience/teacher/department");
  return response.data;
};

export const getTeacherAudienceBySpecialty = async () => {
  const response = await axiosInstance.get("audience/teacher/specialty");
  return response.data;
};

export const getTeacherAudienceByLevel = async () => {
  const response = await axiosInstance.get("audience/teacher/level");
  return response.data;
};

export const getTeacherAudience = async () => {
  const response = await axiosInstance.get("audience/teacher");
  return response.data;
};

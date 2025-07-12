import axiosInstance from "../axios/authAxios";

export const getActiveCourses = async () => {
  const response = await axiosInstance.get("course/active");
  return response.data;
};


export const bulkActivateCourse = async (courseData) => {
  const response = await axiosInstance.post("course/bulk-activate", courseData);
  return response.data;
};

export const bulkDeactivateCourse = async (courseData) => {
  const response = await axiosInstance.post("course/bulk-deactivate", courseData);
  return response.data;
};

export const bulkDeleteCourse = async (deleteData) => {
  const response = await axiosInstance.post("course/bulk-delete", deleteData);
  return response.data;
};

export const bulkUpdateCourse = async (updateData) => {
  const response = await axiosInstance.patch("course/bulk-update", updateData);
  return response.data;
};


export const createCourse = async (createData) => {
  const response = await axiosInstance.post("course/courses", createData);
  return response.data;
};


export const getCourses = async () => {
  const response = await axiosInstance.get("course/courses");
  return response.data;
};

export const getCoursesBySpecialtySemester = async (specialtyId, semesterId) => {
  const response = await axiosInstance.get(`course/specialty/${specialtyId}/semester/${semesterId}`);
  return response.data;
};


export const getCourseDetails = async (courseId) => {
  const response = await axiosInstance.get(`course/${courseId}`);
  return response.data;
};


export const updateCourse = async (courseId, updateData) => {
  const response = await axiosInstance.put(`course/${courseId}`, updateData);
  return response.data;
};


export const deleteCourse = async (courseId) => {
  const response = await axiosInstance.delete(`course/${courseId}`);
  return response.data;
};


export const activateCourse = async (courseId) => {
  const response = await axiosInstance.post(`course/${courseId}/activate`);
  return response.data;
};

export const deactivateCourse = async (courseId) => {
  const response = await axiosInstance.post(`course/${courseId}/deactivate`);
  return response.data;
};
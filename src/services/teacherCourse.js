import axiosInstance from "../axios/authAxios";

export const getAssignableTeacherCourses = async (teacherId) => {
  const response = await axiosInstance.get(
    `teacher-course/course/assignable/teacher/${teacherId}`
  );
  return response.data;
};

export const getAssignedTeacherCourses = async (teacherId) => {
  const response = await axiosInstance.get(
    `teacher-course/course/assigned/teacher/${teacherId}`
  );
  return response.data;
};

export const assignTeacherCourse = async (data) => {
  const response = await axiosInstance.post("teacher-course/assign", data);
  return response.data;
};

export const removeAssignedTeacherCourse = async (data) => {
  const response = await axiosInstance.post("teacher-course/remove", data);
  return response.data;
};

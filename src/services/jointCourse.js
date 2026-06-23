import axiosInstance from "../axios/authAxios";

export const createJointCourse = async (payload) => {
  const response = await axiosInstance.post("joint-course/create", payload);
  return response.data;
};

export const updateJointCourse = async (payload, jointCourseId) => {
  const response = await axiosInstance.post(
    `joint-course/update/${jointCourseId}`,
    payload,
  );
  return response.data;
};

export const deleteJointCourse = async (jointCourseId) => {
  const response = await axiosInstance.delete(
    `joint-course/delete/${jointCourseId}`,
  );
  return response.data;
};

export const getJointCourses = async () => {
  const response = await axiosInstance.get("joint-course");
  return response.data;
};

export const getJointCourseDetails = async (jointCourseId) => {
  const response = await axiosInstance.get(
    `joint-course/details/${jointCourseId}`,
  );
  return response.data;
};

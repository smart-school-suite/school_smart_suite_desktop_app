import axiosInstance from "../axios/authAxios";

export const getSemesterJointCourse = async () => {
  const response = await axiosInstance.get("semester-joint-course");
  return response.data;
};

import axiosInstance from "../axios/authAxios";

export const getTeacherAvailability = async () => {
  const response = await axiosInstance.get(
    `teacher-avialability/instructor-availabilities`
  );
  return response.data;
};

export const getTeacherAvailabilitySlots = async (availabilityId) => {
  const response = await axiosInstance.get(
    `teacher-avialability/instructor-availability/slots/${availabilityId}`
  );
  return response.data;
};

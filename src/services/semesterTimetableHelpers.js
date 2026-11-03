import axiosInstance from "../axios/authAxios";

export const getAvailableHalls = async (payload) => {
  const response = await axiosInstance.post(
    "semester-timetable-helpers/available-halls",
    payload,
  );
  return response.data;
};

export const getAvailablePreferenceTeachers = async (payload) => {
  const response = await axiosInstance.post(
    "semester-timetable-helpers/available/preferred-teachers",
    payload,
  );
  return response.data;
};

export const getAvailableFixedTeachers = async (payload) => {
  const response = await axiosInstance.post(
    "semester-timetable-helpers/available/fixed-teachers",
    payload,
  );
  return response.data;
};

export const getTeachers = async (schoolSemesterId) => {
  const response = await axiosInstance.get(
    `semester-timetable-helpers/teachers/school-semester/${schoolSemesterId}`,
  );
  return response.data;
};

export const generateSlots = async (payload) => {
  const response = await axiosInstance.post(
    "semester-timetable-helpers/generate-slots",
    payload,
  );
  return response.data;
};

export const getCoursesSchoolSemesterId = async (payload) => {
  const response = await axiosInstance.post(
    "semester-timetable-helpers/courses",
    payload,
  );
  return response.data;
};

/**
 * Free slots for a teacher and/or course (optionally in a hall) on a day.
 * Payload: { day, period_duration_id, teacher_id?, course_id?, hall_id?,
 *            school_semester_id?, start_time?, end_time? }
 * Returns { recommended: [...], unavailable: [{ ..., reasons }], summary }.
 */
export const getRecommendedSlots = async (payload) => {
  const response = await axiosInstance.post(
    "semester-timetable-helpers/recommended-slots",
    payload,
  );
  return response.data;
};

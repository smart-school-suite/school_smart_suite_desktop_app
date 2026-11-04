import axiosInstance from "../axios/authAxios";

export const getJointCourseTerms = async () => {
  const response = await axiosInstance.get("joint-course-timetable/terms");
  return response.data;
};

export const getJointCourseTerm = async (schoolYearId, semesterId) => {
  const response = await axiosInstance.get(
    `joint-course-timetable/term/${schoolYearId}/${semesterId}`,
  );
  return response.data;
};

// slots: [{ day, start_time, end_time, hall_id, teacher_id }]. An empty list clears the times.
export const saveJointCourseSlots = async (semesterJointCourseId, slots) => {
  const response = await axiosInstance.put(
    `joint-course-timetable/${semesterJointCourseId}/slots`,
    { slots },
  );
  return response.data;
};

// payload: { day, duration_minutes, teacher_id?, hall_id?, start_time?, end_time? }
export const getJointCourseRecommendedSlots = async (
  semesterJointCourseId,
  payload,
) => {
  const response = await axiosInstance.post(
    `joint-course-timetable/${semesterJointCourseId}/recommended-slots`,
    payload,
  );
  return response.data;
};

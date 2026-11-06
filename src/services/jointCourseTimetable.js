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

// payload: { duration_minutes, days?, teacher_id?, start_time?, end_time? }
export const getJointCourseHallAvailability = async (semesterJointCourseId, payload) => {
  const response = await axiosInstance.post(
    `joint-course-timetable/${semesterJointCourseId}/hall-availability`,
    payload,
  );
  return response.data;
};

// payload: { hall_id, duration_minutes, days?, teacher_id?, start_time?, end_time? }
export const getJointCourseRecommendedWeek = async (semesterJointCourseId, payload) => {
  const response = await axiosInstance.post(
    `joint-course-timetable/${semesterJointCourseId}/recommended-week`,
    payload,
  );
  return response.data;
};

// payload: { period_duration_id, days: [{ day, period_duration_id? }], start_time?, end_time? }
// Returns every free option (time + hall) on those days, kept on the server as a proposal.
export const generateJointCourseSlots = async (semesterJointCourseId, payload) => {
  const response = await axiosInstance.post(
    `joint-course-timetable/${semesterJointCourseId}/generate`,
    payload,
  );
  return response.data;
};

// Saves the picked options exactly as generated. A 422 carries errors.conflicts.
export const confirmJointCourseSlots = async (semesterJointCourseId, proposalId, optionIds) => {
  const response = await axiosInstance.post(
    `joint-course-timetable/${semesterJointCourseId}/proposals/${proposalId}/confirm`,
    { option_ids: optionIds },
  );
  return response.data;
};

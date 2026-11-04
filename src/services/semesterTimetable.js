import axiosInstance from "../axios/authAxios";

export const getSemesterTimetableConstraints = async () => {
  const response = await axiosInstance.get(
    "semester-timetable/constraints/category",
  );
  return response.data;
};
export const getSemesterTimetableVersions = async (schoolSemesterId) => {
  const response = await axiosInstance.get(
    `semester-timetable/version/school-semester/${schoolSemesterId}`,
  );
  return response.data;
};
export const createSemesterTimetableVersion = async (data) => {
  const response = await axiosInstance.post(
    "semester-timetable/version/create",
    data,
  );
  return response.data;
};
export const deleteSemesterTimetableVersion = async ($versionId) => {
  const response = await axiosInstance.delete(
    `semester-timetable/version/delete/${$versionId}`,
  );
  return response.data;
};
export const generateSemesterTimetable = async (data) => {
  const response = await axiosInstance.post(
    "semester-timetable/generate",
    data,
  );
  return response.data;
};
export const getSemesterTimetableSlots = async (versionId) => {
  const response = await axiosInstance.get(
    `semester-timetable/version/${versionId}/timetable-slots`,
  );
  return response.data;
};
export const activateTimetable = async (data) => {
  const response = await axiosInstance.post(
    "semester-timetable/create/active",
    data,
  );
  return response.data;
};
export const getTimetableStatus = async (versionId) => {
  const response = await axiosInstance.get(
    `semester-timetable/version/${versionId}/status`,
  );
  return response.data;
};
export const getTimetableSlots = async (versionId) => {
  const response = await axiosInstance.get(
    `semester-timetable/version/${versionId}/slots`,
  );
  return response.data;
};
export const getPeriodDuration = async (versionId) => {
   const response = await axiosInstance.get(
      "period-duration/semester-timetable"
   );
   return response.data;
}
export const getSolutions = async (versionId) => {
  const response = await axiosInstance.get(
    `semester-timetable/version/${versionId}/solutions`,
  );
  return response.data;
};
export const applySolution = async (versionId, payload) => {
  const response = await axiosInstance.post(
    `semester-timetable/version/${versionId}/solutions/apply`,
    payload,
  );
  return response.data;
};
export const activationCheck = async (versionId) => {
  const response = await axiosInstance.get(
    `semester-timetable/version/${versionId}/activation-check`,
  );
  return response.data;
};
export const activateVersion = async (versionId) => {
  const response = await axiosInstance.post(
    `semester-timetable/version/${versionId}/activate`,
  );
  return response.data;
};
export const getActiveTimetable = async (schoolSemesterId) => {
  const response = await axiosInstance.get(
    `semester-timetable/school-semester/${schoolSemesterId}/active-timetable`,
  );
  return response.data;
};

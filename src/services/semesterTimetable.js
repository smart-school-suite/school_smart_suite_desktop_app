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

export const getTimetableDiagnostics = async (timetableVersionId) => {
  const response = await axiosInstance.get(
    `semester-timetable/diagnostics/${timetableVersionId}`,
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

export const getRawDiagnostics = async (versionId) => {
  const response = await axiosInstance.get(
    `semester-timetable/version/${versionId}/raw-diagnostics`,
  );
  return response.data;
};

export const getTimetableSlots = async (versionId) => {
  const response = await axiosInstance.get(
    `semester-timetable/version/${versionId}/slots`,
  );
  return response.data;
};

export const getParsedDiagnostics = async (versionId) => {
  const response = await axiosInstance.get(
    `semester-timetable/version/${versionId}/parsed-diagnostics`,
  );
  return response.data;
};

export const getTimetablePayload = async (versionId) => {
  const response = await axiosInstance.get(
    `semester-timetable/version/${versionId}/payload`,
  );
  return response.data;
};

export const getTimetableError = async (versionId) => {
  const response = await axiosInstance.get(
    `semester-timetable/version/${versionId}/errors`,
  );
  return response.data;
};

export const getPeriodDuration = async (versionId) => {
   const response = await axiosInstance.get(
      "period-duration/semester-timetable"
   );
   return response.data;
}

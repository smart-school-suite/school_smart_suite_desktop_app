import axiosInstance from "../axios/authAxios";

// Automatic exam timetable generation (same flow as the semester timetable).

export const getExamTimetableConstraints = async () => {
  const response = await axiosInstance.get("exam-timetable/constraints");
  return response.data;
};

// { exam, courses[], halls[], invigilators[] } used to fill the constraint editors.
export const getExamSchedulingData = async (examId) => {
  const response = await axiosInstance.get(`exam-timetable/exam/${examId}/scheduling-data`);
  return response.data;
};

export const getExamTimetableVersions = async (examId) => {
  const response = await axiosInstance.get(`exam-timetable/version/exam/${examId}`);
  return response.data;
};

export const createExamTimetableVersion = async (data) => {
  const response = await axiosInstance.post("exam-timetable/version/create", data);
  return response.data;
};

export const deleteExamTimetableVersion = async (versionId) => {
  const response = await axiosInstance.delete(`exam-timetable/version/delete/${versionId}`);
  return response.data;
};

export const generateExamTimetableVersion = async (data) => {
  const response = await axiosInstance.post("exam-timetable/generate", data);
  return response.data;
};

export const getExamTimetableSlots = async (versionId) => {
  const response = await axiosInstance.get(`exam-timetable/version/${versionId}/slots`);
  return response.data;
};

export const getExamTimetableSolutions = async (versionId) => {
  const response = await axiosInstance.get(`exam-timetable/version/${versionId}/solutions`);
  return response.data;
};

export const applyExamTimetableSolutions = async (versionId, payload) => {
  const response = await axiosInstance.post(`exam-timetable/version/${versionId}/solutions/apply`, payload);
  return response.data;
};

export const examTimetableActivationCheck = async (versionId) => {
  const response = await axiosInstance.get(`exam-timetable/version/${versionId}/activation-check`);
  return response.data;
};

export const activateExamTimetableVersion = async (versionId) => {
  const response = await axiosInstance.post(`exam-timetable/version/${versionId}/activate`);
  return response.data;
};

export const getActiveExamTimetable = async (examId) => {
  const response = await axiosInstance.get(`exam-timetable/exam/${examId}/active-timetable`);
  return response.data;
};

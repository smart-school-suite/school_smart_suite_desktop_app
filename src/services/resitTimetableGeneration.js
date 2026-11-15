import axiosInstance from "../axios/authAxios";

// Automatic resit timetable generation: the exam timetable flow for a resit exam.
const BASE = "resit-timetable-generation";

export const getResitTimetableConstraints = async () => (await axiosInstance.get(`${BASE}/constraints`)).data;

// { resit_exam, exam, courses[] (with candidate_count), halls[], invigilators[] }
export const getResitSchedulingData = async (resitExamId) =>
  (await axiosInstance.get(`${BASE}/resit-exam/${resitExamId}/scheduling-data`)).data;

export const getResitTimetableVersions = async (resitExamId) =>
  (await axiosInstance.get(`${BASE}/resit-exam/${resitExamId}/versions`)).data;

export const createResitTimetableVersion = async (data) => (await axiosInstance.post(`${BASE}/version`, data)).data;

export const deleteResitTimetableVersion = async (versionId) => (await axiosInstance.delete(`${BASE}/version/${versionId}`)).data;

export const generateResitTimetableVersion = async (data) => (await axiosInstance.post(`${BASE}/generate`, data)).data;

export const getResitTimetableSlots = async (versionId) => (await axiosInstance.get(`${BASE}/version/${versionId}/slots`)).data;

export const getResitTimetableSolutions = async (versionId) => (await axiosInstance.get(`${BASE}/version/${versionId}/solutions`)).data;

export const applyResitTimetableSolutions = async (versionId, payload) =>
  (await axiosInstance.post(`${BASE}/version/${versionId}/solutions/apply`, payload)).data;

export const resitTimetableActivationCheck = async (versionId) =>
  (await axiosInstance.get(`${BASE}/version/${versionId}/activation-check`)).data;

export const activateResitTimetableVersion = async (versionId) => (await axiosInstance.post(`${BASE}/version/${versionId}/activate`)).data;

export const getActiveResitTimetable = async (resitExamId) =>
  (await axiosInstance.get(`${BASE}/resit-exam/${resitExamId}/active-timetable`)).data;

// Invigilators of a resit exam (same shapes as the exam invigilator endpoints).
export const getResitInvigilators = async (resitExamId) =>
  (await axiosInstance.get(`${BASE}/resit-exam/${resitExamId}/invigilators`)).data;

export const getPotentialResitInvigilators = async (resitExamId) =>
  (await axiosInstance.get(`${BASE}/resit-exam/${resitExamId}/invigilators/potential`)).data;

export const assignResitInvigilators = async (data) => (await axiosInstance.post(`${BASE}/invigilators/assign`, data)).data;

export const removeResitInvigilators = async (data) => (await axiosInstance.post(`${BASE}/invigilators/remove`, data)).data;

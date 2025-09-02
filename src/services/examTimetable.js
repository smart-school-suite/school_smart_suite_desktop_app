import axiosInstance from "../axios/authAxios";

export const deleteTimetableEntry = async (entryId) => {
  const response = await axiosInstance.delete(`exam-timetable/entry/${entryId}`);
  return response.data;
};


export const updateTimetable = async (data) => {
  const response = await axiosInstance.patch("exam-timetable/exam-timetable", data);
  return response.data;
};


export const createTimetable = async (examId, data) => {
  const response = await axiosInstance.post(`exam-timetable/exam/${examId}/timetable`, data);
  return response.data;
};


export const deleteTimetable = async (examId) => {
  const response = await axiosInstance.delete(`exam-timetable/exam/${examId}/timetable`);
  return response.data;
};


export const prepareExamTimeTableData = async (examId) => {
  const response = await axiosInstance.get(`exam-timetable/exams/${examId}/timetable/data`);
  return response.data;
};


export const generateExamTimetable = async (examId) => {
  const response = await axiosInstance.get(`exam-timetable/${examId}`);
  return response.data;
};

export const autoGenExamTimetable = async (data) => {
   const response = await axiosInstance.post("exam-timetable/auto-gen-timetable", data);
   return response.data;
}
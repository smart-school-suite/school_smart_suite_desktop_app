import axiosInstance from "../axios/authAxios";


export const getResitCoursesByExam = async (resitExamId) => {
  const response = await axiosInstance.get(`resit-timetable/resit-exam/${resitExamId}/courses`);
  return response.data;
};


export const createResitTimetable = async ({resitExamId, createData}) => {
  const response = await axiosInstance.post(`resit-timetable/resit-exam/${resitExamId}/timetable`, createData);
  return response.data;
};


export const deleteResitTimetable = async (resitExamId) => {
  const response = await axiosInstance.delete(`resit-timetable/resit-exam/${resitExamId}/timetable`);
  return response.data;
};


export const updateResitTimetable = async (resitExamId, data) => {
  const response = await axiosInstance.put(`resit-timetable/resit-exam/${resitExamId}/timetable`, data);
  return response.data;
};

export const getResitsBySpecialty = async (specialtyId, examId) => {
  const response = await axiosInstance.get(`resit-timetable/specialties/${specialtyId}/resit-exam/${examId}/timetable`);
  return response.data;
};

export const autoGenResitExamTimetable = async (data) => {
   const response = await axiosInstance.post("resit-timetable/auto-gen-timetable", data);
   return response.data;
}
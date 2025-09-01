import axiosInstance from "../axios/authAxios";

export const createTimetable = async (createData) => {
     const response = await axiosInstance.post("timetable/semesters/timetable", createData);
     return response.data;
}

export const createTimetableByAvailability = async (createData) => {
     const response = await axiosInstance.post("timetable/semesters/timetable/availability", createData);
     return response.data;
}

export const getAllInstructorsAvailabiltiesBySemester = async (semesterId, specialtyId) => {
     const response = await axiosInstance.get(`timetable/semesters/${semesterId}/specialties/${specialtyId}/instructor-availability`);
     return response.data;
}

export const deleteTimetableEntry = async (entryId) => {
     const response = await axiosInstance.delete(`timetable/timetable-entry/${entryId}`);
     return response.data;
}

export const getTimetableEntryDetails = async (entryId) => {
     const response = await axiosInstance.get(`timetable/timetable-entry/${entryId}`);
     return response.data;
}

export const updateTimetableByAvailability = async (updateData) => {
     const response = await axiosInstance.patch("timetable/timetable/availability", updateData);
     return response.data;
}

export const generateTimetable = async (generateData) => {
     const response = await axiosInstance.post("timetable/timetable/generate", generateData);
     return response.data;
}

export const updateTimetable = async (updateData) => {
     const response = await axiosInstance.patch("timetable/timetable/specialty", updateData);
     return response.data;
}

export const deleteTimetable = async (deleteData) => {
     const response = await axiosInstance.post("timetable/timetable/specialty", deleteData);
     return response.data;
}

export const autoGenerateTimetable = async ({payload, schoolSemesterId}) => {
      const response = await axiosInstance.post(`timetable/timetable-automatic/${schoolSemesterId}`, payload);
      return response.data;
}
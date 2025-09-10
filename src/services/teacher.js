import axiosInstance from "../axios/authAxios";

export const createTeacher = async (createData) => {
     const response = await axiosInstance.post("auth/teacher/register", createData);
     return response.data;
}

export const getTeachers = async () => {
    const response = await axiosInstance.get("teacher/teachers");
    return response.data;
}

export const getTeacherDetails = async (teacherId) => {
    const response = await axiosInstance.get(`teacher/${teacherId}`);
    return response.data;
}

export const updateTeacher = async (teacherId, updateData) => {
     const response = await axiosInstance.put(`teacher/${teacherId}`, updateData);
     return response.data;
}

export const deleteTeacher = async (teacherId) => {
     const response = await axiosInstance.delete(`teacher/${teacherId}`);
     return response.data;
}

export const deactivateTeacher = async (teacherId, data={}) => {
     const response = await axiosInstance.post(`teacher/${teacherId}/deactivate`, data);
     return response.data;
}

export const activateTeacher = async (teacherId, data={}) => {
     const response = await axiosInstance.post(`teacher/${teacherId}/activate`, data);
     return response.data;
}

export const bulkActivateTeacher = async (activateData) => {
    const response = await axiosInstance.post("teacher/bulk-activate", activateData);
    return response.data;
}

export const bulkDeactivateTeacher = async (deactivateData) => {
     const response = await axiosInstance.post("teacher/bulk-deactivate", deactivateData);
     return response.data;
}

export const bulkDeleteTeacher = async (deleteData) => {
     const response = await axiosInstance.post("teacher/bulk-delete", deleteData);
     return response.data;
}

export const bulkUpdateTeacher = async (updateData) => {
     const response = await axiosInstance.put("teacher/bulk-update", updateData);
     return response.data;
}

export const addTeacherSpecialtyPreference = async (preferenceData) => {
     const response = await axiosInstance.post("teacher/specialty-preference", {specailties_preference: preferenceData});
     return response.data;
}

export const getTeacherSpecialtyPreference = async (teacherId) => {
     const response = await axiosInstance.get(`teacher-preference/teachers/${teacherId}/specialty-preference`);
     return response.data;
}

export const getAvailableSpecialtyPreferences = async (teacherId) => {
     const response = await axiosInstance.get(`teacher-preference/available-preferences/${teacherId}`);
     return response.data;
} 

export const removeSpecialtyPreferences = async (preferenceData) => {
     const response = await axiosInstance.post("teacher-preference/remove-preference", {specialty_preferences: preferenceData})
     return response.data;
}

export const getTeachersBySpecialty = async (specialtyId) => {
     const response = await axiosInstance.get(`teacher/teachers/specialty/${specialtyId}`);
     return response.data;
}

export const bulkAddTeacherSpecialtyPreference = async (data) => {
     const response = await axiosInstance.post('teacher-preference/bulk-add-preference', data);
     return response.data;
}

export const bulkRemoveTeacherSpecialtyPreference = async (data) => {
      const response = await axiosInstance.post('teacher-preference/bulk-remove-preference', data);
      return response.data;
}


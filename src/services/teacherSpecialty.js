import axiosInstance from "../axios/authAxios";
import axiosUploadInstance from "../axios/axiosUploadInstance";
import { appendFormData } from "../utils/functions";

export const assignTeachers = async (payload) => {
  const response = await axiosInstance.post(
    "teacher-specialty/assign-teachers",
    payload,
  );
  return response.data;
};

export const removeTeachers = async (payload) => {
  const response = await axiosInstance.post(
    "teacher-specialty/remove-teachers",
    payload,
  );
  return response.data;
};

export const getAssignableTeachers = async (specialtyId) => {
  const response = await axiosInstance.get(
    `teacher-specialty/specialty/${specialtyId}/teacher-assignable`,
  );
  return response.data;
};

export const getTeacherAssignedSpecialties = async (teacherId) => {
  const response = await axiosInstance.get(
    `teacher-specialty/teacher/${teacherId}/specialties`,
  );
  return response.data;
};

export const importTeacherSpecialty = async (payload) => {
  const formData = new FormData();
  formData.append("file", payload.file, payload.file.name);
  appendFormData(formData, payload.mapping, "mapping");
  const response = await axiosUploadInstance.post(
    "teacher-specialty/import",
    formData,
  );
  return response.data;
};

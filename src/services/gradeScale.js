import axiosInstance from "../axios/authAxios";
import axiosUploadInstance from "../axios/axiosUploadInstance";
import { appendFormData } from "../utils/functions";

export const bulkCopyGradeScale = async (payload) => {
  const response = await axiosInstance.post("/grade-scale/bulk-copy", payload);
  return response.data;
};

export const bulkDeleteGradeScale = async (payload) => {
  const response = await axiosInstance.post("grade-scale/bulk-delete", payload);
  return response.data;
};

export const getGradeScaleCategories = async () => {
  const response = await axiosInstance.get("grade-scale/categories");
  return response.data;
};

export const getActiveGradeScaleCategories = async () => {
  const response = await axiosInstance.get("grade-scale/categories/active");
  return response.data;
};

export const activateGradeScaleCategory = async (categoryId) => {
  const response = await axiosInstance.post(
    `grade-scale/category/activate/${categoryId}`,
  );
  return response.data;
};

export const deactivateGradeScaleCategory = async (categoryId) => {
  const response = await axiosInstance.post(
    `grade-scale/category/deactivate/${categoryId}`,
  );
  return response.data;
};

export const getGradeScaleCategoryDetails = async (categoryId) => {
  const response = await axiosInstance.get(
    `grade-scale/category/details/${categoryId}`,
  );
  return response.data;
};

export const copyGradeScale = async (sourceCategoryId, targetCategoryId) => {
  const response = await axiosInstance.post(
    `grade-scale/copy/source-category/${sourceCategoryId}/target-category/${targetCategoryId}`,
  );
  return response.data;
};

export const createGradeScale = async (payload) => {
  const response = await axiosInstance.post("grade-scale/create", payload);
  return response.data;
};

export const deleteGradeScale = async (categoryId) => {
  const response = await axiosInstance.delete(`grade-scale/${categoryId}`);
  return response.data;
};

export const updateGradeScale = async (payload) => {
  const response = await axiosInstance.patch("grade-scale/update");
  return response.data;
};

export const importGradeScale = async (payload) => {
  const formData = new FormData();
  formData.append("file", payload.file, payload.file.name);
  appendFormData(formData, payload.mapping, "mapping");
  const response = await axiosUploadInstance.post(
    "grade-scale/import",
    formData,
  );
  return response.data;
};

export const getGradeScaleCategoryId = async (categoryId) => {
  const response = await axiosInstance.get(`grade-scale/category/${categoryId}`);
  return response.data;
};

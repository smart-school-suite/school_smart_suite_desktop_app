import axiosInstance from "../axios/authAxios";

export const createExpenseCategory = async (data) => {
  const response = await axiosInstance.post("expenses-category", data);
  return response.data;
};

export const getExpenseCategories = async () => {
  const response = await axiosInstance.get("expenses-category");
  return response.data;
};

export const updateExpenseCategory = async (categoryId, data) => {
  const response = await axiosInstance.put(`expenses-category/${categoryId}`, data);
  return response.data;
};


export const deleteExpenseCategory = async (categoryId) => {
  const response = await axiosInstance.delete(`expenses-category/${categoryId}`);
  return response.data;
};
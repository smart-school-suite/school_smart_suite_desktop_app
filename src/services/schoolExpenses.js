import axiosInstance from "../axios/authAxios";


export const createExpense = async (data) => {
  const response = await axiosInstance.post("school-expenses", data);
  return response.data;
};

export const getExpenses = async () => {
  const response = await axiosInstance.get("school-expenses");
  return response.data;
};

export const bulkDeleteSchoolExpenses = async (expenseIds) => {
  const response = await axiosInstance.post("school-expenses/bulk-delete", { ids: expenseIds });
  return response.data;
};

export const bulkUpdateSchoolExpenses = async (updates) => {
  const response = await axiosInstance.patch("school-expenses/bulk-update", updates);
  return response.data;
};

export const getExpensesDetails = async (expenseId) => {
  const response = await axiosInstance.get(`school-expenses/${expenseId}`);
  return response.data;
};

export const updateExpense = async (expenseId, data) => {
  const response = await axiosInstance.put(`school-expenses/${expenseId}`, data);
  return response.data;
};

export const deleteExpense = async (expenseId) => {
  const response = await axiosInstance.delete(`school-expenses/${expenseId}`);
  return response.data;
};
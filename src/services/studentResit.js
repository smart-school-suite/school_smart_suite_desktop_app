import axiosInstance from "../axios/authAxios";


export const getResitPaymentTransactions = async () => {
  const response = await axiosInstance.get("student-resit/resit-transactions");
  return response.data;
};

export const bulkDeleteStudentResitTransactions = async (deleteData) => {
  const response = await axiosInstance.post("student-resit/resit-transactions/bulk-delete", deleteData);
  return response.data;
};

export const bulkReverseTransaction = async (deleteData) => {
  const response = await axiosInstance.post("student-resit/resit-transactions/bulk-reverse", deleteData);
  return response.data;
};

export const deleteResitTransaction = async (transactionId) => {
  const response = await axiosInstance.delete(`student-resit/resit-transactions/${transactionId}`);
  return response.data;
};

export const getTransactionDetails = async (transactionId) => {
  const response = await axiosInstance.get(`student-resit/resit-transactions/${transactionId}`);
  return response.data;
};

export const reverseTransaction = async (transactionId) => {
  const response = await axiosInstance.delete(`student-resit/resit-transactions/${transactionId}/reverse`);
  return response.data;
};

export const deleteResit = async (resitId) => {
  const response = await axiosInstance.delete(`student-resit/resits/${resitId}`);
  return response.data;
};

export const getResitDetails = async (resitId) => {
  const response = await axiosInstance.get(`student-resit/resits/${resitId}`);
  return response.data;
};

export const getAllResits = async () => {
  const response = await axiosInstance.get("student-resit/student-resits");
  return response.data;
};

export const bulkDeleteStudentResit = async (deleteData) => {
  const response = await axiosInstance.delete("student-resit/student-resits/bulk-delete", deleteData);
  return response.data;
};

export const bulkPayStudentResit = async (payments) => {
  const response = await axiosInstance.post("student-resit/student-resits/bulk-pay", payments);
  return response.data;
};

export const payResit = async (data) => {
  const response = await axiosInstance.post("student-resit/pay-resit", data);
  return response.data;
};
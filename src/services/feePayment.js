import axiosInstance from "../axios/authAxios";


export const payRegistrationFees = async (data) => {
  const response = await axiosInstance.post("fee-payment/registration-fee-payments", data);
  return response.data;
};

export const bulkPayRegistrationFee = async (payments) => {
  const response = await axiosInstance.post("fee-payment/registration-fee-payments/bulk-pay", payments);
  return response.data;
};

export const getRegistrationFeeTransactions = async () => {
  const response = await axiosInstance.get("fee-payment/registration-fee-transactions");
  return response.data;
};

export const bulkDeleteRegistrationFeeTransactions = async (transactionData) => {
  const response = await axiosInstance.post("fee-payment/registration-fee-transactions/bulk-delete", transactionData);
  return response.data;
};

export const bulkReverseRegistrationFeeTransaction = async (transactionData) => {
  const response = await axiosInstance.post("fee-payment/registration-fee-transactions/bulk-reverse", transactionData);
  return response.data;
};

export const reverseRegistrationFeeTransaction = async (transactionId, data={}) => {
  const response = await axiosInstance.delete(`fee-payment/registration-fee-transactions/${transactionId}/reverse`, data);
  return response.data;
};

export const getRegistrationFees = async () => {
  const response = await axiosInstance.get("fee-payment/registration-fees");
  return response.data;
};

export const getFeeDebtors = async () => {
  const response = await axiosInstance.get("fee-payment/tuition-fee-debtors");
  return response.data;
};

export const payTuitionFees = async (data) => {
  const response = await axiosInstance.post("fee-payment/tuition-fee-payments", data);
  return response.data;
};

export const getFeesPaid = async () => {
  const response = await axiosInstance.get("fee-payment/tuition-fee-payments");
  return response.data;
};

export const updateFeesPaid = async (feeId, data) => {
  const response = await axiosInstance.put(`fee-payment/tuition-fee-payments/${feeId}`, data);
  return response.data;
};

export const deleteFeePaid = async (feeId) => {
  const response = await axiosInstance.delete(`fee-payment/tuition-fee-payments/${feeId}`);
  return response.data;
};

export const getTuitionFeeTransactions = async () => {
  const response = await axiosInstance.get("fee-payment/tuition-fee-transactions");
  return response.data;
};

export const bulkDeleteTuitionFeeTransactions = async (transactionData) => {
  const response = await axiosInstance.post("fee-payment/tuition-fee-transactions/bulk-delete", transactionData);
  return response.data;
};

export const bulkReverseTuitionFeeTransaction = async (transactionData) => {
  const response = await axiosInstance.post("fee-payment/tuition-fee-transactions/bulk-reverse", transactionData);
  return response.data;
};

export const getTuitionTransactionFeeDetails = async (transactionId) => {
  const response = await axiosInstance.get(`fee-payment/tuition-fee-transactions/${transactionId}`);
  return response.data;
};


export const deleteTuitionFeeTransaction = async (transactionId) => {
  const response = await axiosInstance.delete(`fee-payment/tuition-fee-transactions/${transactionId}`);
  return response.data;
};

export const reverseTuitionFeeTransaction = async (transactionId) => {
  const response = await axiosInstance.delete(`fee-payment/tuition-fee-transactions/${transactionId}/reverse`);
  return response.data;
};

export const getTuitionFees = async () => {
  const response = await axiosInstance.get("fee-payment/tuition-fees");
  return response.data;
};
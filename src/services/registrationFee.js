import axiosInstance from "../axios/authAxios";

export const payRegistrationFees = async (data) => {
  const response = await axiosInstance.post("registration-fees/pay", data);
  return response.data;
};

export const bulkPayRegistrationFee = async (payments) => {
  const response = await axiosInstance.post(
    "registration-fees/bulk-pay",
    payments
  );
  return response.data;
};

export const getRegistrationFeeTransactions = async () => {
  const response = await axiosInstance.get("registration-fees/transactions");
  return response.data;
};

export const bulkDeleteRegistrationFeeTransactions = async (
  transactionData
) => {
  const response = await axiosInstance.post(
    "registration-fees/transaction/bulk-delete",
    transactionData
  );
  return response.data;
};

export const bulkReverseRegistrationFeeTransaction = async (
  transactionData
) => {
  const response = await axiosInstance.post(
    "registration-fees/transaction/bulk-reverse",
    transactionData
  );
  return response.data;
};

export const reverseRegistrationFeeTransaction = async (
  transactionId,
  data = {}
) => {
  const response = await axiosInstance.delete(
    `registration-fees/transation/${transactionId}/reverse`,
    data
  );
  return response.data;
};

export const getRegistrationFees = async () => {
  const response = await axiosInstance.get("registration-fees");
  return response.data;
};

export const getRegistrationFeeTransactionDetails = async (transactionId) => {
  const response = await axiosInstance.get(
    `fee-payment/registration-fee/transaction/${transactionId}`
  );
  return response.data;
};

export const deleteRegistrationFeeTransaction = async (transactionId) => {
  const response = await axiosInstance.delete(
    `fee-payment/tuition-fee-transactions/${transactionId}`
  );
  return response.data;
};

export const bulkDeleteRegistrationFee = async (deleteData) => {
  const response = await axiosInstance.post(
    "fee-payment/registration-fee/bulk-delete",
    deleteData
  );
  return response.data;
};

export const deleteRegistrationFee = async (feeId) => {
  const response = await axiosInstance.delete(
    `fee-payment/registration-fee/${feeId}`
  );
  return response.data;
};

export const getRegistrationFeeDetails = async (feeId) => {
  const response = await axiosInstance.get(`registration-fees/${feeId}`);
  return response.data;
};
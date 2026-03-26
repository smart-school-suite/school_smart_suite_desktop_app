import axiosInstance from "../axios/authAxios";

export const getFeeDebtors = async () => {
  const response = await axiosInstance.get("tuition-fee/debtors");
  return response.data;
};

export const payTuitionFees = async (data) => {
  const response = await axiosInstance.post(
    "tuition-fee/pay",
    data
  );
  return response.data;
};

export const getFeesPaid = async () => {
  const response = await axiosInstance.get("tuition-fee/paid");
  return response.data;
};


export const deleteFeePaid = async (feeId) => {
  const response = await axiosInstance.delete(
    `tuition-fee/${feeId}`
  );
  return response.data;
};

export const getTuitionFeeTransactions = async () => {
  const response = await axiosInstance.get(
    "tuition-fee/transaction"
  );
  return response.data;
};

export const bulkDeleteTuitionFeeTransactions = async (transactionData) => {
  const response = await axiosInstance.post(
    "tuition-fee/transaction/bulk-delete",
    transactionData
  );
  return response.data;
};

export const bulkReverseTuitionFeeTransaction = async (transactionData) => {
  const response = await axiosInstance.post(
    "tuition-fee/transaction/bulk-reverse",
    transactionData
  );
  return response.data;
};

export const getTuitionTransactionFeeDetails = async (transactionId) => {
  const response = await axiosInstance.get(
    `tuition-fee/transaction/${transactionId}`
  );
  return response.data;
};

export const deleteTuitionFeeTransaction = async (transactionId) => {
  const response = await axiosInstance.delete(
    `tuition-fee/transaction/${transactionId}`
  );
  return response.data;
};

export const reverseTuitionFeeTransaction = async (transactionId) => {
  const response = await axiosInstance.delete(
    `tuition-fee/transaction/${transactionId}/reverse`
  );
  return response.data;
};

export const getTuitionFees = async () => {
  const response = await axiosInstance.get("tuition-fee");
  return response.data;
};

export const getTuitionFeeDetails = async (feeId) => {
  const response = await axiosInstance.get(`fee-payment/tuition-fee/${feeId}`);
  return response.data;
};

import axiosInstance from "../axios/authAxios";

export const createAdditionalFeeCategory = async (additionalFeeData) => {
     const response = await axiosInstance.post("additional-fee-category", additionalFeeData);
     return response.data;
}

export const deleteAdditionalFeeCategory = async (categoryId) => {
     const response = await axiosInstance.delete(`additional-fee-category/${categoryId}`);
     return response.data;
}

export const getAdditionalFeeCategory = async () => {
     const response = await axiosInstance.get("additional-fee-category");
     return response.data;
}

export const updateAdditionalFeeCategory = async (categoryId, categoryData) => {
     const response = await axiosInstance.put(`additional-fee-category/${categoryId}`, categoryData);
     return response.data;
}

export const createStudentAdditionalFee = async (additionalFeeData) => {
     const response = await axiosInstance.post("additional-fees", additionalFeeData);
     return response.data;
}

export const getStudentAdditionalFees = async () => {
     const response = await axiosInstance.get("additional-fees");
     return response.data;
}

export const getAdditionalFeeTransactions = async () => {
     const response = await axiosInstance.get("additional-fees/additional-fee-transactions");
     return response.data;
}

export const bulkDeleteAdditionalFeeTransactions = async (deleteData) => {
     const response = await axiosInstance.post("additional-fees/additional-fee-transactions/bulk-delete", deleteData);
     return response.data;
}

export const bulkReverseAdditionalFeeTransactions = async (transactionData) => {
     const response = await axiosInstance.delete("additional-fees/additional-fee-transactions/bulk-reverse", transactionData);
     return response.data;
}

export const getAdditionalFeeTransactionDetails = async (transactionId) => {
     const response = await axiosInstance.get(`additional-fees/additional-fee-transactions/${transactionId}`);
     return response.data;
}

export const deleteAdditionalFeeTransaction = async (transactionId) => {
     const response = await axiosInstance.delete(`additional-fees/additional-fee-transactions/${transactionId}`);
     return response.data;
}

export const reverseAdditionalFeeTransaction = async (transactionId) => {
     const response = await axiosInstance.delete(`additional-fees/additional-fee-transactions/${transactionId}/reverse`);
     return response.data;
}

export const bulkBillStudentAdditionalFee = async (additionalFeeData) => {
     const response = await axiosInstance.post("additional-fees/bulk-bill", additionalFeeData);
     return response.data;
}

export const bulkDeleteAdditionalFee = async (additionalFeeData) => {
     const response = await axiosInstance.post("additional-fees/bulk-delete", additionalFeeData);
     return response.data;
}

export const bulkPayAdditionalFee = async (additionalFeeData) => {
     const response = await axiosInstance.post("additional-fees/bulk-pay", additionalFeeData);
     return response.data;
}

export const payAdditionalFee = async (additionalFeeData) => {
     const response = await axiosInstance.post("additional-fees/pay", additionalFeeData);
     return response.data;
}

export const updateAdditionalFee = async (feeId, additionalFeeData) => {
     const response = await axiosInstance.put(`additional-fees/${feeId}`, additionalFeeData);
     return response.data;
}

export const deleteAdditionalFee = async (feeId) => {
    const response = await axiosInstance.delete(`additional-fees/${feeId}`);
    return response.data;
}

export const getAdditionalFeeDetails = async (feeId) => {
     const response = await axiosInstance.get(`additional-fees/details/${feeId}`);
     return response.data;
}
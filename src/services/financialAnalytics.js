import axiosInstance from "../axios/authAxios";

export const getSchoolRevenue = async (year) => {
  const response = await axiosInstance.get(
    `financial-stats/revenue/total/${year}`
  );
  return response.data;
};

export const getAdditionalFeePaidVsUnPaidCategory = async (year) => {
  const response = await axiosInstance.get(
    `financial-stats/additional-fee/paid-vs-unpaid/by-category/${year}`
  );
  return response.data;
};

export const getAdditionalFeePaidVsUnPaidLevel = async (year) => {
  const response = await axiosInstance.get(
    `financial-stats/additional-fee/paid-vs-unpaid/by-level/${year}`
  );
  return response.data;
};

export const getAdditionalFeePaymentRate = async (year) => {
  const response = await axiosInstance.get(
    `financial-stats/additional-fee/payment-rate/${year}`
  );
  return response.data;
};

export const getCardStats = async (year) => {
  const response = await axiosInstance.get(`financial-stats/cards/${year}`);
  return response.data;
};

export const getRegistrationFeePaidVsUnPaidLevel = async (year) => {
  const response = await axiosInstance.get(
    `financial-stats/registration-fee/paid-vs-debt/by-level/${year}`
  );
  return response.data;
};

export const getRegistrationFeePaymentRate = async (year) => {
  const response = await axiosInstance.get(
    `financial-stats/registration-fee/payment-rate/${year}`
  );
  return response.data;
};

export const getResitFeePaidVsUpaidLevelExamType = async (year) => {
  const response = await axiosInstance.post(
    `financial-stats/resit-fee/paid-vs-debt/by-level-exam-type/${year}`
  );
  return response.data;
};

export const getResitFeePaymentRate = async (year) => {
  const response = await axiosInstance.get(
    `financial-stats/resit-fee/payment-rate/${year}`
  );
  return response.data;
};

export const getSchoolRevenueSource = async (year) => {
  const response = await axiosInstance.get(
    `financial-stats/revenue/by-source/${year}`
  );
  return response.data;
};

export const getTuitionFeePaidVsUnpaidLevel = async (year) => {
  const response = await axiosInstance.get(
    `financial-stats/tuition-fee/paid-vs-unpaid/by-level/${year}`
  );
  return response.data;
};

export const getTuitionFeePaymentRate = async (year) => {
  const response = await axiosInstance.get(
    `financial-stats/tuition-fee/payment-rate/${year}`
  );
  return response.data;
};

export const getMonthlySchoolExpense = async (year) => {
   const response = await axiosInstance.get(
    `financial-stats/school-expense/monthly/${year}`
   )
   return response.data;
}

export const getSchoolExpenseCategory = async (year) => {
   const response = await axiosInstance.get(
      `financial-stats/school-expense/category/${year}`
   )
   return response.data;
}
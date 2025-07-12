import axiosInstance from "../axios/authAxios";

export const getFeeInstallments = async () => {
    const response = await axiosInstance.get("fee-installment/status/active");
    return response.data
}
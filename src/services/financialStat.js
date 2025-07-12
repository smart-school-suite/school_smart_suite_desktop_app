import axiosInstance from "../axios/authAxios";

 export const getSchoolFinancialStats = async (year) => {
      const response = await axiosInstance.get(`financial-stats/${year}`);
      return response.data;
 }
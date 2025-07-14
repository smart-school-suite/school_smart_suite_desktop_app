import axiosInstance from "../axios/authAxios";

export const getSchoolOperationalStats = async (year) => {
    const response = await axiosInstance.get(`operational-stats/${year}`);
    return response.data; 
}
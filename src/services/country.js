import axiosInstance from "../axios/authAxios";
export const getCountries = async () => {
     const response = await axiosInstance.get("country");
     return response.data;
}
import axiosInstance from "../axios/authAxios";

export const getSemester = async () => {
    const response = await axiosInstance.get("semester");
    return response.data;
}
import axiosInstance from "../axios/authAxios";

export const getLevels = async () => {
    const response = await axiosInstance.get("level");
    return response.data;
}
import axiosInstance from "../axios/authAxios";

export const getPresetGroups = async () => {
    const response = await axiosInstance.get("preset-audience/active");
    return response.data;
}
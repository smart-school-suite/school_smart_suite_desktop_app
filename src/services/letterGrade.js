import axiosInstance from "../axios/authAxios";

export const getLetterGrades = async () => {
    const response = await axiosInstance.get("letter-grade");
    return response.data;
}
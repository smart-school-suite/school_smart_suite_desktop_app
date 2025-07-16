import axiosInstance from "../axios/authAxios";

export const getSchoolGradeCategories = async () => {
    const response = await axiosInstance.get("school-grades/school-grade-config");
    return response.data;
}
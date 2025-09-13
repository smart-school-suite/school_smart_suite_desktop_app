import axiosInstance from "../axios/authAxios";

export const getSchoolGradeCategories = async () => {
    const response = await axiosInstance.get("school-grades/school-grade-config");
    return response.data;
}

export const bulkCreateGradesByCategory = async (data) => {
     const response = await axiosInstance.post("grade/bulk/create", data);
     return response.data;
}

export const bulkDeleteGradesByCategory = async (data) => {
    const response = await axiosInstance.post("grade/bulk/delete", data);
    return response.data;
}

export const bulkCreateGradesByTargetCategory = async (data) => {
     const response = await axiosInstance.post("grade/bulk/create/grade-category", data);
     return response.data;
}
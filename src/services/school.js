import axiosInstance from "../axios/authAxios";

export const getSchoolDetails = async (schoolId) => {
     const response = await axiosInstance.get(`school/${schoolId}`);
     return response.data;
}  

export const updateSchool = async (updateData) => {
    const response = await axiosInstance.put(`school/${schoolId}`);
    return response.data;
}

export const deleteSchool = async (schoolId) => {
    const response = await axiosInstance.delete(`school/${schoolId}`);
    return response.data;
}
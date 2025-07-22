import axiosInstance from "../axios/authAxios";

export const getSchoolDetails = async () => {
     const response = await axiosInstance.get(`school`);
     return response.data;
}  

export const updateSchool = async (data) => {
    const response = await axiosInstance.put('school', data);
    return response.data;
}

export const deleteSchool = async () => {
    const response = await axiosInstance.delete(`school`);
    return response.data;
}
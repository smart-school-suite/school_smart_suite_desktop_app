import axiosInstance from "../axios/authAxios";

export const createSchoolSemester = async (createData) => {
  const response = await axiosInstance.post("school-semester", createData);
  return response.data;
}

export const getSchoolSemesters = async () => {
  const response = await axiosInstance.get("school-semester");
  return response.data;
}

export const getActiveSchoolSemester = async () => {
     const response = await axiosInstance.get("school-semester/active");
     return response.data;
}

export const bulkDeleteSchoolSemesters = async (deleteData) => {
     const response = await axiosInstance.post("school-semester/bulk-delete", deleteData);
     return response.data;
}

export const bulkUpdateSchoolSemester = async (updateData) => {
     const response = await axiosInstance.patch("school-semester/bulk-update", updateData);
     return response.data;
}

export const updateSchoolSemester = async (schoolSemesterId, updateData) => {
     const response = await axiosInstance.put(`school-semester/${schoolSemesterId}`, updateData);
     return response.data;
}

export const deleteSchoolSemester = async (schoolSemesterId) => {
    const response = await axiosInstance.delete(`school-semester/${schoolSemesterId}`);
    return response.data;
}

export const getSchoolSemesterDetails = async (schoolSemesterId) => {
    const response = await axiosInstance.get(`school-semester/${schoolSemesterId}`);
    return response.data;
}
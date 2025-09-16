import axiosInstance from "../axios/authAxios";
export const getAllStudents = async () => {
  const response = await axiosInstance.get("student/students");
  return response.data;
};
export const getStudentDetails = async (studentId) => {
  const response = await axiosInstance.get(`student/${studentId}`);
  return response.data
}

export const updateStudent = async (studentId, updateStudentData) => {
  const response = await axiosInstance.put(`student/${studentId}`, updateStudentData);
  return response.data;
}

export const deleteStudent = async (studentId) => {
  const response = await axiosInstance.delete(`student/${studentId}`);
  return response.data;
}

export const activateStudent = async (studentId) => {
  const response = await axiosInstance.post(`student/${studentId}/activate`);
  return response.data;
}

export const deactivateStudent = async (studentId) => {
  const response = await axiosInstance.post(`student/${studentId}/deactivate`);
  return response.data;
}

export const markStudentAsDropout = async (studentId) => {
    const response = await axiosInstance.post(`student/${studentId}/dropout`);
    return response.data;
}

export const bulkActivateStudent = async (studentData) => {
     const response = await axiosInstance.post("student/bulk-activate", studentData);
     return response.data;
}

export const bulkDeactivateStudent = async (studentData) => {
     const response = await axiosInstance.post("student/bulk-deactivate", studentData);
     return response.data;
}

export const bulkDeleteStudent = async (studentData) => {
     const response = await axiosInstance.post("student/bulk-delete", studentData);
     return response.data;
}

export const bulkUpdateStudent = async (studentData) => {
     const response = await axiosInstance.patch("student/bulk-update", studentData);
     return response.data;
}

export const bulkMarkStudentAsDropout = async (studentData) => {
     const response = await axiosInstance.post("student/bulk-dropout", studentData);
     return response.data;
}

export const getDropoutStudents = async () => {
     const response = await axiosInstance.get("student/dropouts");
     return response.data;
}

export const reinstateDropOutStudent = async (studentDropoutId) => { 
    const response = await axiosInstance.post(`student/dropouts/${studentDropoutId}/reinstate`)
    return response.data;
}

export const createStudent = async (studentData) => {
     const response = await axiosInstance.post("auth/student/register", studentData);
     return response.data;
}

export const bulkReinstateDropoutStudent = async (data) => {
      const response = await axiosInstance.post("student/bulk-reinstate/dropout", data);
      return response.data;
}
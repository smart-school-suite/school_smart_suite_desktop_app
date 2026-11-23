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

export const uploadSchoolLogo = async (logo, onUploadProgress) => {
  const formData = new FormData();
  formData.append("school_logo", logo);
  const response = await axiosInstance.post("school-asset/school-logo/upload", formData, {
    onUploadProgress,
  });
  return response.data;
};

export const removeSchoolLogo = async () => {
  const response = await axiosInstance.delete("school-asset/school-logo/remove");
  return response.data;
};

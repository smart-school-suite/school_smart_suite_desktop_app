import axiosInstance from "../axios/authAxios";


export const getSchoolAdmins = async () => {
  const response = await axiosInstance.get("school-admin");
  return response.data;
};

export const bulkActivateSchoolAdmin = async (activateData) => {
  const response = await axiosInstance.post("school-admin/bulk-activate", activateData);
  return response.data;
};

export const bulkDeactivateSchoolAdmin = async (deactivateData) => {
  const response = await axiosInstance.post("school-admin/bulk-deactivate", deactivateData);
  return response.data;
};

export const bulkDeleteSchoolAdmin = async (deleteData) => {
  const response = await axiosInstance.post("school-admin/bulk-delete", deleteData);
  return response.data;
};

export const bulkUpdateSchoolAdmin = async (updateData) => {
  const response = await axiosInstance.patch("school-admin/bulk-update", updateData);
  return response.data;
};


export const getSchoolAdminDetails = async (schoolAdminId) => {
  const response = await axiosInstance.get(`school-admin/${schoolAdminId}`);
  return response.data;
};

export const updateSchoolAdmin = async (schoolAdminId, updateData) => {
  const response = await axiosInstance.put(`school-admin/${schoolAdminId}`, updateData);
  return response.data;
};


export const deleteSchoolAdmin = async (schoolAdminId) => {
  const response = await axiosInstance.delete(`school-admin/${schoolAdminId}`);
  return response.data;
};

export const activateSchoolAdminAccount = async (schoolAdminId) => {
  const response = await axiosInstance.post(`school-admin/${schoolAdminId}/activate`);
  return response.data;
};

export const deactivateSchoolAdminAccount = async (schoolAdminId) => {
  const response = await axiosInstance.post(`school-admin/${schoolAdminId}/deactivate`);
  return response.data;
};

export const createSchoolAdmin = async (createData) => {
   const response = await axiosInstance.post("auth/school-admin/register", createData)
   return response.data;
}

export const getAuthSchoolAdmin = async () => {
   const response = await axiosInstance.get("auth/school-admin/me");
   return response.data;
}

export const updateSchoolAdminProfile = async (updateData) => {
   const response = await axiosInstance.put("school-admin/update-profile", updateData);
   return response.data;
}
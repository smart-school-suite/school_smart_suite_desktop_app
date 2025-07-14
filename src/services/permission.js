import axiosInstance from "../axios/authAxios";


export const getPermissions = async () => {
  const response = await axiosInstance.get("permission");
  return response.data;
};

export const getSchoolAdminPermissions = async (schoolAdminId) => {
  const response = await axiosInstance.get(`permission/school-admin/${schoolAdminId}`);
  return response.data;
};

export const getAssignableSchoolAdminPermission  = async (schoolAdminId) => {
   const response = await axiosInstance.get(`permission/assignable-permissions/${schoolAdminId}`);
   return response.data;
}

export const givePermissionToSchoolAdmin = async (schoolAdminId, data) => {
  const response = await axiosInstance.post(`permission/school-admin/${schoolAdminId}`, data);
  return response.data;
};

export const revokePermission = async (schoolAdminId, data) => {
  const response = await axiosInstance.delete(`permission/school-admin/${schoolAdminId}`, data);
  return response.data;
};
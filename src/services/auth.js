import axiosInstance from "../axios/authAxios";
export const logout = (data = {}) => {
    const response = axiosInstance.post('auth/school-admin/logout', data);
    return response.data;
}
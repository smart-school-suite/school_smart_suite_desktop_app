import axiosInstance from "../axios/authAxios";

export const getAllNotifications = async () => {
    const response  = await axiosInstance.get("school-admin/notifications");
    return response.data;
}

export const markAllNotificationAsRead = async () => {
   const response = await axiosInstance.post("school-admin/notificaiton/read");
   return response.data;
}
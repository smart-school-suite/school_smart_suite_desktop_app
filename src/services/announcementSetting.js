import axiosInstance from "../axios/authAxios";



export const getSchoolAnnouncementSettings = async () => {
  const response = await axiosInstance.get("school-announcement-setting");
  return response.data;
};

export const updateSchoolAnnouncementSetting = async (settingId, data) => {
  const response = await axiosInstance.patch(`school-announcement-setting/${settingId}`, data);
  return response.data;
};
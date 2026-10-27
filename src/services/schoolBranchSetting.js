import axiosInstance from "../axios/authAxios";

export const getSettings = async () => {
  const response = await axiosInstance.get("school-branch-setting");
  return response.data;
};

export const getSettingDetails = async (settingId) => {
  const response = await axiosInstance.get(
    `school-branch-setting/details/${settingId}`,
  );
  return response.data;
};

export const updateSetting = async (payload) => {
  const response = await axiosInstance.patch("school-branch-setting/update", payload);
  return response.data;
};

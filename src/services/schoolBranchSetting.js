import axiosInstance from "../axios/authAxios";

export const getSchoolBranchSetting = async () => {
     const response = await axiosInstance.get("school-branch-setting");
     return response.data;
}

export const updateElectionSetting = async (data) => {
      const response = await axiosInstance.patch("school-branch-setting/election-setting", data);
      return response.data;
}

export const updateExamSetting = async (data) => {
      const response = await axiosInstance.patch("school-branch-setting/exam-setting", data);
      return response.data;
}

export const updateGradeSetting = async (data) => {
      const response = await axiosInstance.patch("school-branch-setting/grade-setting", data);
      return response.data;
}

export const updatePromotionSetting = async (data) => {
      const response = await axiosInstance.patch("school-branch-setting/promotion-setting", data);
      return response.data;
}

export const updateResitSetting  = async (data) => {
      const response = await axiosInstance.patch("school-branch-setting/resit-setting", data);
      return response.data;
}

export const updateTimetableSetting = async (data) => {
      const response = await axiosInstance.patch("school-branch-setting/timetable-setting", data);
      return response.data;
}

export const getSchoolBranchSettingDetails = async (schoolBranchSettingId) => { 
      const response = await axiosInstance.get(`school-branch-setting/details/${schoolBranchSettingId}`);
      return response.data;
}


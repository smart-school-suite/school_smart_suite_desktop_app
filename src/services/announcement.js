import axiosInstance from "../axios/authAxios";

export const getAnnouncementCategories = async () => {
     const response = await axiosInstance.get("announcement-category");
     return response.data;
}

export const createAnnouncementCategory = async (categoryData) => {
     const response = await axiosInstance.post("announcement-category", categoryData);
     return response.data;
}

export const updateAnnouncementCategory = async (categoryId, categoryData) => {
     const response = await axiosInstance.put(`announcement-category/${categoryId}`, categoryData);
     return response.data;
}

export const deleteAnnouncementCategory = async (categoryId) => {
    const response = await axiosInstance.delete(`announcement-category/${categoryId}`);
    return response.data;
}

export const getAnnouncementLabels = async () => {
     const response = await axiosInstance.get("announcement-label");
     return response.data;
}

export const createAnnouncementTag = async (tagData) => {
     const response = await axiosInstance.post("announcement-tag", tagData);
     return response.data;
}

export const getAnnouncementTags = async () => {
     const response = await axiosInstance.get("announcement-tag");
     return response.data;
}

export const deleteAnnouncementTag = async (tagId) => {
     const response = await axiosInstance.delete(`announcement-tag/${tagId}`);
     return response.data;
}

export const updateAnnouncementTag = async (tagId, updateData) => {
     const response = await axiosInstance.put(`announcement-tag/${tagId}`, updateData);
     return response.data;
} 

export const createAnnouncement = async (announcementData) => {
     const response = await axiosInstance.post("announcement/create", announcementData);
     return response.data;
}

export const deleteAnnouncement = async (announcementId) => {
     const response = await axiosInstance.delete(`announcement/delete/${announcementId}`);
     return response.data;
}

export const getAnnouncementDetails = async (announcementId) => {
     const response = await axiosInstance.get(`announcement/details/${announcementId}`);
     return response.data;
}

export const updateAnnouncementContent = async (announcementId, contentData) => {
     const response = await axiosInstance.put(`announcement/update-content/${announcementId}`, contentData);
     return response.data;
}

export const getAnnouncementByStatus = async (status) => {
    const  response = await axiosInstance.get(`announcement/${status}`);
    return response.data;
}

export const getTargetAudience = async () => {
     const response = await axiosInstance.get('target-audience');
     return response.data;
} 
export const getAnnouncementEngagementStats = async (announcementId) => {
      const response = await axiosInstance.get(`announcement/engagement-stats/${announcementId}`);
      return response.data;
}
export const getAnnouncementReadUnreadList = async (announcementId) => {
      const response = await axiosInstance.get(`announcement/read-uread/list/${announcementId}`);
      return response.data;
}
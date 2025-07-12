import axiosInstance from "../axios/authAxios";


export const getAllParents = async () => {
  const response = await axiosInstance.get("parent");
  return response.data;
};

export const createParent = async (data) => {
  const response = await axiosInstance.post("parent", data);
  return response.data;
};

export const bulkDeleteParents = async (parentIds) => {
  const response = await axiosInstance.post("parent/bulk-delete", { ids: parentIds });
  return response.data;
};

export const bulkUpdateParents = async (updates) => {
  const response = await axiosInstance.patch("parent/bulk-update", updates);
  return response.data;
};

export const getParentDetails = async (parentId) => {
  const response = await axiosInstance.get(`parent/${parentId}`);
  return response.data;
};

export const updateParent = async (parentId, data) => {
  const response = await axiosInstance.put(`parent/${parentId}`, data);
  return response.data;
};

export const deleteParent = async (parentId) => {
  const response = await axiosInstance.delete(`parent/${parentId}`);
  return response.data;
};
import axiosInstance from "../axios/authAxios";
import axiosUploadInstance from "../axios/axiosUploadInstance";

export const createSpecialty = async (data) => {
  const response = await axiosInstance.post("specialty", data);
  return response.data;
};

export const getSpecialties = async () => {
  const response = await axiosInstance.get("specialty");
  return response.data;
};

export const bulkActivateSpecialty = async (specialtyData) => {
  const response = await axiosInstance.post(
    "specialty/bulk-activate",
    specialtyData,
  );
  return response.data;
};

export const bulkDeactivateSpecialty = async (specialtyData) => {
  const response = await axiosInstance.post(
    "specialty/bulk-deactivate",
    specialtyData,
  );
  return response.data;
};

export const bulkDeleteSpecialty = async (specialtyData) => {
  const response = await axiosInstance.post(
    "specialty/bulk-delete",
    specialtyData,
  );
  return response.data;
};

export const bulkUpdateSpecialty = async (updates) => {
  const response = await axiosInstance.patch("specialty/bulk-update", updates);
  return response.data;
};

export const getSpecialtyDetails = async (specialtyId) => {
  const response = await axiosInstance.get(`specialty/${specialtyId}`);
  return response.data;
};

export const updateSpecialty = async (specialtyId, data) => {
  const response = await axiosInstance.put(`specialty/${specialtyId}`, data);
  return response.data;
};

export const deleteSpecialty = async (specialtyId) => {
  const response = await axiosInstance.delete(`specialty/${specialtyId}`);
  return response.data;
};

export const activateSpecialty = async (specialtyId) => {
  const response = await axiosInstance.post(
    `specialty/${specialtyId}/activate`,
  );
  return response.data;
};

export const deactivateSpecialty = async (specialtyId, data = {}) => {
  const response = await axiosInstance.post(
    `specialty/${specialtyId}/deactivate`,
    data,
  );
  return response.data;
};

export const getLevelSpecialties = async () => {
  const response = await axiosInstance.get("specialty/specialty/level");
  return response.data;
};

export const importSpecialty = async (payload) => {
  const formData = new FormData();
  formData.append("file", payload.file, payload.file.name);
  appendFormData(formData, payload.mapping, "mapping");
  const response = await axiosUploadInstance.post(
    "specialty/import",
    formData,
  );
  return response.data;
};

const appendFormData = (formData, data, parentKey = "") => {
  if (data === null || data === undefined) {
    return;
  }

  if (data instanceof File) {
    formData.append(parentKey, data);
    return;
  }

  if (Array.isArray(data)) {
    data.forEach((value, index) => {
      appendFormData(
        formData,
        value,
        `${parentKey}[${index}]`
      );
    });

    return;
  }

  if (typeof data === "object") {
    Object.entries(data).forEach(([key, value]) => {
      const fieldKey = parentKey
        ? `${parentKey}[${key}]`
        : key;

      appendFormData(
        formData,
        value,
        fieldKey
      );
    });

    return;
  }

  formData.append(parentKey, String(data));
};

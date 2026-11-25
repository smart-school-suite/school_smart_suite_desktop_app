import axiosUploadInstance from "../axios/axiosUploadInstance";

/**
 * Append nested data to FormData with bracket keys
 * (mapping[standardFields][email]=Email), the shape Laravel reads.
 */
export const appendFormData = (formData, data, parentKey = "") => {
  if (data === null || data === undefined) return;

  if (data instanceof File || data instanceof Blob) {
    formData.append(parentKey, data);
    return;
  }

  if (Array.isArray(data)) {
    data.forEach((value, index) =>
      appendFormData(formData, value, `${parentKey}[${index}]`),
    );
    return;
  }

  if (typeof data === "object") {
    Object.entries(data).forEach(([key, value]) =>
      appendFormData(formData, value, parentKey ? `${parentKey}[${key}]` : key),
    );
    return;
  }

  formData.append(parentKey, String(data));
};

/**
 * Upload a spreadsheet and its column mapping to an import endpoint.
 * The API answers 202 with the queued system job in `data`.
 */
export const uploadImport = async (endpoint, { file, mapping }) => {
  const formData = new FormData();
  formData.append("file", file, file.name);
  appendFormData(formData, mapping, "mapping");
  const response = await axiosUploadInstance.post(endpoint, formData);
  return response.data;
};

export const importSchoolAdmin = (payload) =>
  uploadImport("school-admin/import", payload);

export const importTeacherCourse = (payload) =>
  uploadImport("teacher-course/import", payload);

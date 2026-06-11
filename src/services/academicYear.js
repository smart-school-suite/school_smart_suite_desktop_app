import axiosInstance from "../axios/authAxios";

export const getSchoolAcademicYears = async () => {
  const response = await axiosInstance.get("school-academic-year");
  return response.data;
};

export const createSchoolAcademicYear = async (payload) => {
  const response = await axiosInstance.post("school-academic-year/create", payload);
  return response.data;
};

export const updateSchoolAcademicYear = async (payload, schoolAcademicYearId) => {
  const response = await axiosInstance.post(
    `school-academic-year/${schoolAcademicYearId}/update`,
    payload,
  );
  return response.data;
};

export const deleteSchoolAcademicYear = async (schoolAcademicYearId) => {
  const response =  await axiosInstance.delete(
    `school-academic-year/${schoolAcademicYearId}/delete`,
  );
  return response.data;
};

export const getSchoolAcademicYearDetails = async (schoolAcademicYearId) => {
  const response = await axiosInstance.get(
    `school-academic-year/${schoolAcademicYearId}`,
  );
  return response.data;
};


export const getAllSystemAcademicYear = async () => {
     const response = await axiosInstance.get("system-academic-year/all");
     return response.data;
}

export const getCurrentSystemAcademicYear = async () => {
     const response = await axiosInstance.get("system-academic-year/current-year");
     return response.data;
}
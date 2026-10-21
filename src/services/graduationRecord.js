import axiosInstance from "../axios/authAxios";

export const getGraduationRecords = async () => {
  const response = await axiosInstance.get("/graduation-record");
  return response.data;
};

export const approveAlumnus = async (payload) => {
  const response = await axiosInstance.post(
    "/graduation-record/approve-alumnus",
    payload,
  );
  return response.data;
};

export const approveContinuation = async (payload) => {
  const response = await axiosInstance.post(
    "graduation-record/approve-continuation",
    payload,
  );
  return response.data;
};

export const approveEligibility = async (payload) => {
  const response = await axiosInstance.post(
    "graduation-record/approve-eligibility",
    payload
  );
  return response.data;
};

export const blockGraduation = async (payload) => {
  const response = await axiosInstance.post("graduation-record/block", payload);
  return response.data;
};

export const markIneligible = async (payload) => {
  const response = await axiosInstance.post(
    "graduation-record/mark-ineligibility",
    payload,
  );
  return response.data;
};

export const requestReview = async (payload) => {
  const response = await axiosInstance.post(
    "graduation-record/request-review",
    payload,
  );
  return response.data;
};

export const unblockGraduation = async (payload) => {
  const response = await axiosInstance.post(
    "graduation-record/unblock",
    payload,
  );
  return response.data;
};

export const getGraduationRecordDetails = async (recordId) => {
  const response = await axiosInstance.get(
    `graduation-record/${recordId}/details`,
  );
  return response.data;
};

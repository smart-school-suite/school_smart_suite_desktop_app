import axiosInstance from "../axios/authAxios";

export const submitResitScores = async (data) => {
  const response = await axiosInstance.post(
    "resit-evaluation/resit-scores/create",
    data,
  );
  return response.data;
};

export const updateResitScores = async (data) => {
  const response = await axiosInstance.put(
    "resit-evaluation/resit-scores/update",
    data,
  );
  return response.data;
};

export const getResitEvaluationHelperData = async (candidateId) => {
  const response = await axiosInstance.get(
    `resit-evaluation-helper/candidate/${candidateId}/exam-helper`,
  );
  return response.data;
};

export const getResitUpdateEvaluationHelperData = async (candidateId) => {
  const response = await axiosInstance.get(
    `resit-evaluation-helper/candidate/${candidateId}/update-helper`,
  );
  return response.data;
};

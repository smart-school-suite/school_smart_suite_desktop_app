import axiosInstance from "../axios/authAxios";

export const getCaEvaluationHelperData = async (candidateId) => {
  const response = await axiosInstance.get(
    `evaluation-helper/candidate/${candidateId}/ca-helper`,
  );
  return response.data;
};

export const getExamEvaluationHelperData = async (candidateId) => {
  const response = await axiosInstance.get(
    `evaluation-helper/candidate/${candidateId}/exam-helper`,
  );
  return response.data;
};

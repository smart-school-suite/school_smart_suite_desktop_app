import axiosInstance from "../axios/authAxios";

export const getExamScores = async (candidateId) => {
  const response = await axiosInstance.get(
    `exam-score/candidate/${candidateId}/exam`,
  );
  return response.data;
};

export const getCaScores = async (candidateId) => {
  const response = await axiosInstance.get(
    `exam-score/candidate/${candidateId}/ca`,
  );
  return response.data;
};

export const deleteExamScores = async (candidateId) => {
  const response = await axiosInstance.delete(
    `exam-score/candidate/${candidateId}/exam`,
  );
  return response.data;
};

export const deleteCaExamScores = async (candidateId) => {
  const response = await axiosInstance.delete(
    `exam-score/candidate/${candidateId}/ca`,
  );
  return response.data;
};

import axiosInstance from "../axios/authAxios";

export const getResitExamScores = async (candidateId) => {
  const response = await axiosInstance.get(
    `resit-score/candidate/${candidateId}/resit-exam`,
  );
  return response.data;
};

export const deleteResitExamScores = async (candidateId) => {
  const response = await axiosInstance.delete(
    `resit-score/candidate/${candidateId}/resit-exam`,
  );
  return response.data;
};

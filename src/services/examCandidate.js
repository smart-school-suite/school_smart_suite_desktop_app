import axiosInstance from "../axios/authAxios";

export const getExamCandidates = async () => {
     const response = await axiosInstance.get("exam-candidate");
     return response.data;
}

export const deleteExamCandidates = async (candidateId) => {
     const response = await axiosInstance.delete(`exam-candidate/${candidateId}`)
     return response.data;
} 
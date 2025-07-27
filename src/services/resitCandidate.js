import axiosInstance from "../axios/authAxios";

export const getResitCandidates = async () => {
    const response = await axiosInstance.get('resit-candidate');
    return response.data;
}

export const deleteResitCandidate = async (candidateId) => {
     const response = await axiosInstance.delete(`resit-candidate/${candidateId}`);
     return response.data;
}
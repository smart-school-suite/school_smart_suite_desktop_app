import axiosInstance from "../axios/authAxios"
export const getExamResults = async () => {
   const response = await axiosInstance.get("exam-results/student-results");
   return response.data;
}

export const getResultDetails = async (resultId) => {
    const response = await axiosInstance.get(`exam-results/result/${resultId}`);
    return response.data;
}
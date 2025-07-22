import axiosInstance from "../axios/authAxios";

export const getSchoolBranchDetails = async () => {
    const response = await axiosInstance.get("school-branch")
    return response.data;
}

export const updateSchoolBranch = async (data) => {
    const response = await axiosInstance.put("school-branch", data)
    return response.data;
}

export const deleteSchoolBranch = async () => {
    const response = await axiosInstance.delete("school-branch");
    return response.data;
}
import axiosInstance from "../axios/authAxios";

export const getAllElectionApplications = async () => {
  const response = await axiosInstance.get("election-application");
  return response.data;
};

export const bulkApproveApplications = async (approveData) => {
  const response = await axiosInstance.post("election-application/bulk-approve", approveData);
  return response.data;
};

export const bulkDeleteApplications = async (deleteData) => {
  const response = await axiosInstance.post("election-application/bulk-delete", deleteData);
  return response.data;
};


export const deleteApplication = async (applicationId) => {
  const response = await axiosInstance.delete(`election-application/${applicationId}`);
  return response.data;
};

export const approveApplication = async (applicationId) => {
  const response = await axiosInstance.put(`election-application/${applicationId}/approve`);
  return response.data;
};

export const getApplicationDetails = async (applicationId) =>{
   const response = await axiosInstance.get(`election-application/${applicationId}`);
   return response.data;
}
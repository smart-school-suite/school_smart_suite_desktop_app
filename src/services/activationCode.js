import axiosInstance from "../axios/authAxios";

export const getActivationCodeType = async () => {
  const response = await axiosInstance.get(
    "activation-code-type/school/code-type"
  );
  return response.data;
};

export const purchaseActivationCode = async (data) => {
  const response = await axiosInstance.post("activation-code/purchase", data);
  return response.data;
};

export const getSchoolActivationCodes = async () => {
  const response = await axiosInstance.get("activation-code/school");
  return response.data;
};

export const activateStudentAccount = async (data) => {
  const response = await axiosInstance.post(
    "activation-code/student/activate",
    data
  );
  return response.data;
};

export const activateTeacherAccount = async (data) => {
  const response = await axiosInstance.post(
    "activation-code/teacher/activate",
    data
  );
  return response.data;
};

export const getActivationCodeTransactions = async () => {
  const response = await axiosInstance.get("activation-code-transaction");
  return response.data;
};


export const getActivationCodeUsage = async () => {
   const response = await axiosInstance.get("activation-code/usage");
   return response.data;
}

export const getStudentActivationCodeStatus = async () => {
   const response = await axiosInstance.get("activation-code/status/student");
   return response.data;
}

export const getTeacherActivationCodeStatus = async () => {
   const response = await axiosInstance.get("activation-code/status/teacher");
   return response.data;
}

export const getTeacherSubscriptionDetail = async (teacherId) => {
   const response = await axiosInstance.get(`activation-code/teacher/subscription/${teacherId}`);
   return response.data;
}

export const getStudentSubscriptionDetail = async (studentId) => {
   const response = await axiosInstance.get(`activation-code/student/subscription/${studentId}`);
   return response.data;
}
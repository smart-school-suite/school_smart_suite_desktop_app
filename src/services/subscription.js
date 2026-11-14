import axios from "../axios/axios";

export const getSubscriptionPlans = async (countryId) => {
   const response = await axios.get(`plan/country/${countryId}`);
   return response.data;
}

export const getSubscriptionPlanDetails = async (planId) => {
    const response = await axios.get(`plan/${planId}`);
    return response.data;
}

// Current subscription, usage per feature, every plan compared with the
// current one and the usage-based recommendation.
export const getPlanInsights = async () => {
    const response = await axios.get(`school-subscription/plan-insights`);
    return response.data;
}

export const upgradeSubscriptionPlan = async (data) => {
    const response = await axios.post(`school-subscription/upgrade`, data);
    return response.data;
}

export const renewSubscriptionPlan = async (data) => {
    const response = await axios.post(`school-subscription/renew`, data);
    return response.data;
}

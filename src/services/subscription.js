import axios from "../axios/axios";

export const getSubscriptionPlans = async (countryId) => {
   const response = await axios.get(`plan/country/${countryId}`);
   return response.data;
}

export const getSubscriptionPlanDetails = async (planId) => {
    const response = await axios.get(`plan/${planId}`);
    return response.data;
}
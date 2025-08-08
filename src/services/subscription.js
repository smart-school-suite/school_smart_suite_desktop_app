import axios from "../axios/axios";
export const getSubscriptionRates = async () => {
   const response = await axios.get("subscription-rate/rates")
   return response.data;
}
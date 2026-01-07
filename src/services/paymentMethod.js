import axios from "../axios/axios";

export const getPaymentMethods = async (countryId) => {
    const response = await axios.get(`payment-method/country/${countryId}`);
    return response.data;
}
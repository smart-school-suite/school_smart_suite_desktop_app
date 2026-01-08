import { useQuery } from "@tanstack/react-query";
import { getRegistrationFeePaymentRate } from "../../services/financialAnalytics";

export const useGetRegistrationFeePaymentRate = async (year) => {
     return useQuery({
         queryKey:["registrationFeePaymentRate", year],
         queryFn:() => getRegistrationFeePaymentRate(year)
     })
}
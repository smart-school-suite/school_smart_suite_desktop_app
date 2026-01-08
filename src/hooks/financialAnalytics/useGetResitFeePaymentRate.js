import { useQuery } from "@tanstack/react-query";
import { getResitFeePaymentRate } from "../../services/financialAnalytics";

export const useGetResitFeePaymentRate = async (year) => {
     return useQuery({
         queryKey:["resitFeePaymentRate", year],
         queryFn:() => getResitFeePaymentRate(year)
     })
}
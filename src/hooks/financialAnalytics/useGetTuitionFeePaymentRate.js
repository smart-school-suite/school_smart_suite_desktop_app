import { useQuery } from "@tanstack/react-query";
import { getTuitionFeePaymentRate } from "../../services/financialAnalytics";

export const useGetTuitionFeePaymentRate = (year) => {
      return useQuery({
         queryKey:["tuitionFeePaymentRate", year],
         queryFn:() => getTuitionFeePaymentRate(year)
      })
}
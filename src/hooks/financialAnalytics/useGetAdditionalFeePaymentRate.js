import { useQuery } from "@tanstack/react-query";
import { getAdditionalFeePaymentRate } from "../../services/financialAnalytics";

export const useGetAdditionalFeePaymentRate = async (year) => {
  return useQuery({
    queryKey: ["additionalFeePaymentRate", year],
    queryFn: () => getAdditionalFeePaymentRate(year),
  });
};

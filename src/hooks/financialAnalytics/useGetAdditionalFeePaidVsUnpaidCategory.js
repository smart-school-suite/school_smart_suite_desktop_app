import { useQuery } from "@tanstack/react-query";
import { getAdditionalFeePaidVsUnPaidCategory } from "../../services/financialAnalytics";

export const useGetAdditionalFeePaidVsUnpaidCatgory = async (year) => {
  return useQuery({
    queryKey: ["additionalFeePaidVsUnpaidCategory", year],
    queryFn: () => getAdditionalFeePaidVsUnPaidCategory(year),
  });
};

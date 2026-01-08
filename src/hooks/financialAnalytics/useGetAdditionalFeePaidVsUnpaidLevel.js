import { useQuery } from "@tanstack/react-query";
import { getAdditionalFeePaidVsUnPaidLevel } from "../../services/financialAnalytics";

export const useGetAdditionalFeePaidVsUnPaidLevel = async (year) => {
  return useQuery({
    queryKey: ["additionalFeePaidVsUnpaidLevel", year],
    queryFn: () => getAdditionalFeePaidVsUnPaidLevel(year),
  });
};

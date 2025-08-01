import { useQuery } from "@tanstack/react-query";
import { getAdditionalFeeDetails } from "../../services/additionalFee";

export const useGetAdditionalFeeDetails = (additionalFeeId) => {
  return useQuery({
    queryKey: ["additionalFee", additionalFeeId],
    queryFn: () => getAdditionalFeeDetails(additionalFeeId),
    enabled: !!additionalFeeId,
  });
};

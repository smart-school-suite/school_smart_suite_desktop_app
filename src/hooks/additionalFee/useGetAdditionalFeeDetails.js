import { useQuery } from "@tanstack/react-query";
import { getAdditionalFeeDetails } from "../../services/additionalFee";

export const useGetAdditionalFeeDetails = ( ) => {
     return useQuery({
                  queryKey: ['additionalFee', additionalFeeId],
                  queryFn: () => getAdditionalFeeDetails(additionalFeeId),
                  enabled: !!additionalFeeId,
    });
}

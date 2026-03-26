import { useQuery } from "@tanstack/react-query";
import { getRegistrationFeeDetails } from "../../services/registrationFee";

export const useGetRegistrationFeeDetails = (feeId) => {
  return useQuery({
    queryKey: ["registrationFee", feeId],
    queryFn: () => getRegistrationFeeDetails(feeId),
  });
};

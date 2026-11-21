import { useQuery } from "@tanstack/react-query";
import { getRegistrationFeeTransactions } from "../../services/registrationFee";
import { retryUnlessEmpty } from "../../utils/query/emptyList";

export const useGetRegistrationFeeTransations = (options = {}) => {
  return useQuery({
    queryKey: ["registrationFeeTransactions"],
    queryFn: () => getRegistrationFeeTransactions(),
    // Older API versions answer an empty list with 404: don't retry that.
    retry: retryUnlessEmpty,
    ...options,
  });
};

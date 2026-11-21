import { useQuery } from "@tanstack/react-query";
import { getRegistrationFees } from "../../services/registrationFee";
import { retryUnlessEmpty } from "../../utils/query/emptyList";

export const useGetRegistrationFees = (options = {}) => {
  return useQuery({
    queryKey: ["registrationFees"],
    queryFn: () => getRegistrationFees(),
    // Older API versions answer an empty list with 404: don't retry that.
    retry: retryUnlessEmpty,
    ...options,
  });
};

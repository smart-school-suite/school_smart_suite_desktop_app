import { useQuery } from "@tanstack/react-query";
import { getTuitionFees } from "../../services/feePayment";
import { retryUnlessEmpty } from "../../utils/query/emptyList";

export const useGetTuitionFees = (options = {}) => {
  return useQuery({
    queryKey: ["tuitionFees"],
    queryFn: () => getTuitionFees(),
    // Older API versions answer an empty list with 404: don't retry that.
    retry: retryUnlessEmpty,
    ...options,
  });
};

import { useQuery } from "@tanstack/react-query";
import { getTuitionFeeTransactions } from "../../services/feePayment";
import { retryUnlessEmpty } from "../../utils/query/emptyList";

export const useGetTuitionFeeTransactions = (options = {}) => {
  return useQuery({
    queryKey: ["tuitionFeeTransactions"],
    queryFn: () => getTuitionFeeTransactions(),
    // Older API versions answer an empty list with 404: don't retry that.
    retry: retryUnlessEmpty,
    ...options,
  });
};

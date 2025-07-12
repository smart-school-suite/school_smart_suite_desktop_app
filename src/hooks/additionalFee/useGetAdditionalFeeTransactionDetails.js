import { getAdditionalFeeTransactionDetails } from "../../services/additionalFee";
import { useQuery } from "@tanstack/react-query";

export const useGetAdditionalFeeTransactionDetails = (transactionId) => {
      return useQuery({
              queryKey: ['additionalFeetransaction', transactionId],
              queryFn: () => getAdditionalFeeTransactionDetails(transactionId),
              enabled: !!transactionId,
     });
}
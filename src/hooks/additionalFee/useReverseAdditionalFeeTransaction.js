import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reverseAdditionalFeeTransaction } from "../../services/additionalFee";

export const useReverseAdditionalFeeTransaction = () => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:reverseAdditionalFeeTransaction,
         onSuccess: (reversedTransactionId) => {
             queryClient.invalidateQueries({ queryKey:["additionalFeeTransactions"]}),
             queryClient.invalidateQueries({ queryKey:["additionalFees"] })
             queryClient.invalidateQueries({ queryKey:["additionalFeetransaction", reversedTransactionId]})
         }
     })
}
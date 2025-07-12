import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reverseTuitionFeeTransaction } from "../../services/feePayment";

export const useReverseTuitionFeeTransaction = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:reverseTuitionFeeTransaction,
         onSuccess:(transactionId) => {
            queryClient.invalidateQueries({ queryKey:["tuitionFeeTransactions"] })
            queryClient.invalidateQueries({ queryKey:["tuitionFeeTransaction", transactionId] })
            queryClient.invalidateQueries({ queryKey:["tuitionFees"] })
         }
    })
}
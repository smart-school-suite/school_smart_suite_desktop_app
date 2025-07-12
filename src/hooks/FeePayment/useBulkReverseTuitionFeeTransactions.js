import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkReverseTuitionFeeTransaction } from "../../services/feePayment";

export const useBulkReverseTuitionFeeTransactions = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:bulkReverseTuitionFeeTransaction,
         onSuccess:() => {
            queryClient.invalidateQueries({queryKey:["tuitionFeesTransactions"]})
            queryClient.invalidateQueries({queryKey:["feesPaid"]})
            queryClient.invalidateQueries({ queryKey:["tuitionFees"] })
         }
    })
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTuitionFeeTransaction } from "../../services/feePayment";

export const useDeleteTuitionFeeTransaction = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:deleteTuitionFeeTransaction,
         onSuccess:(transactionId) => {
            queryClient.invalidateQueries({queryKey:["tuitionFeesTransactions"]})
            queryClient.removeQueries({ queryKey:["tuitionFeeTransaction", transactionId] })
         }
    })
}
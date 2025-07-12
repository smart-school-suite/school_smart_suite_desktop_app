import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTuitionFeeTransaction } from "../../services/feePayment";

export const useDeleteTuitionFeeTransactions = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:deleteTuitionFeeTransaction,
         onSuccess:() => {
             queryClient.invalidateQueries({queryKey:["tuitionFeesTransactions"]})
             queryClient.invalidateQueries({queryKey:["feesPaid"]})
         }
    })
}
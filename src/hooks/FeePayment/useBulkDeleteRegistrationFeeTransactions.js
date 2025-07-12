import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkDeleteRegistrationFeeTransactions } from "../../services/feePayment";

export const useBulkDeleteRegistrationFeeTransactions = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:bulkDeleteRegistrationFeeTransactions,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["registrationFeeTransactions"] })
             queryClient.invalidateQueries({ queryKey:["registrationFees"]})
         }
    })
}
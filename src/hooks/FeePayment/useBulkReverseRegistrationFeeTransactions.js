import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkReverseRegistrationFeeTransaction } from "../../services/feePayment";

export const useBulkReverseRegistrationFeeTransactions = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:bulkReverseRegistrationFeeTransaction,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["registrationFeeTransactions"] })
             queryClient.invalidateQueries({ queryKey:["registrationFees"]})
             
         }
    })
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reverseRegistrationFeeTransaction } from "../../services/feePayment";

export const useReverseRegistrationFeeTransaction = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:reverseRegistrationFeeTransaction,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["registrationFeeTransactions"] })
            queryClient.invalidateQueries({ queryKey:["registrationFees"]})
         }
    })
}
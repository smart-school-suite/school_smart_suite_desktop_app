import { bulkPayRegistrationFee } from "../../services/feePayment";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useBulkPayRegistrationFees = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:bulkPayRegistrationFee,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["registrationFees"]})
            queryClient.invalidateQueries({ queryKey:["registrationFeeTransactions"] })

         }
    })
}
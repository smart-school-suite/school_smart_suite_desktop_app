import { useMutation, useQueryClient } from "@tanstack/react-query";
import { payRegistrationFees } from "../../services/feePayment";

export const usePayRegistrationFee = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:payRegistrationFees,
         onSuccess:() => {
             queryClient.invalidateQueries({ queryKey:["registrationFees"]})
             queryClient.invalidateQueries({ queryKey:["registrationFeeTransactions"] })
             
             
         }
    })
}
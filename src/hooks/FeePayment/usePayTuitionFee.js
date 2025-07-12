import { useMutation, useQueryClient } from "@tanstack/react-query";
import { payTuitionFees } from "../../services/feePayment";

export const usePayTuitionFee = () => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:payTuitionFees,
         onSuccess:() => {
             queryClient.invalidateQueries({ queryKey:["feesPaid"]})
             queryClient.invalidateQueries({queryKey:["tuitionFeesTransactions"]})
             queryClient.invalidateQueries({ queryKey:["tuitionFees"] })
         }
     })
}
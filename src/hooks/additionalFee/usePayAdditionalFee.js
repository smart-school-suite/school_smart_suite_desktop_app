import { useMutation, useQueryClient } from "@tanstack/react-query";
import { payAdditionalFee } from "../../services/additionalFee";

export const usePayAdditionalFee =  () => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:payAdditionalFee,
         onSuccess: (data, paidAdditionalFeeId) => {
             queryClient.invalidateQueries({ queryKey:["additionalFeeTransactions"] })
             queryClient.invalidateQueries({ queryKey:["additionalFees"] })
             queryClient.invalidateQueries({ queryKey:["additionalFee", paidAdditionalFeeId] })
         }
     });
}
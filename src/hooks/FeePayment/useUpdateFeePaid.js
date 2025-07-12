import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFeesPaid } from "../../services/feePayment";

export const useUpdateFeesPaid = () => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:({ feeId, data }) => updateFeesPaid(feeId, data),
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["feesPaid"] })
         }
     })
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFeePaid } from "../../services/feePayment";

export const useDeleteFeePaid = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:deleteFeePaid,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["feesPaid"]})
            
         }
    })
}
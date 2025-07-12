import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAdditionalFee } from "../../services/additionalFee";

export const useDeleteAdditionalFee = ( ) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:deleteAdditionalFee,
         onSuccess: (deletedAdditionalFeeId) => {
             queryClient.invalidateQueries({ queryKey:["additionalFees"] })
             queryClient.invalidateQueries({ queryKey:["additionalFee", deletedAdditionalFeeId]})
         }
    })
}
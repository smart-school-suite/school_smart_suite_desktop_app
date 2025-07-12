import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAdditionalFee } from "../../services/additionalFee";

export const useUpdateAdditionalFee = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn: ({ feeId, updateData }) => updateAdditionalFee(feeId, updateData),
         onSuccess: (updatedAdditionalFeeId) => {
             queryClient.invalidateQueries({ queryKey:["additionalFees"] })
             queryClient.invalidateQueries({ queryKey:["additionalFee", updatedAdditionalFeeId] })
         }
    })
}
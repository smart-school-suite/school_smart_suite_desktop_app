import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAdditionalFeeCategory } from "../../services/additionalFee";

export const useDeleteAdditionalFeeCategory = () => {
     const queryClient = useQueryClient();
     return useMutation({
        mutationFn:deleteAdditionalFeeCategory,
        onSuccess: () => {
             queryClient.invalidateQueries({ queryKey:["additionalFeeCategories"]})
        } 
     });
}
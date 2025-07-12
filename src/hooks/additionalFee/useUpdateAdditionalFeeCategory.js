import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAdditionalFeeCategory } from "../../services/additionalFee";

export const useUpdateAdditionalFeeCategory = () => {
     const queryClient = useQueryClient();
     return useMutation({ 
        mutationFn:({ categoryId, updateData }) => updateAdditionalFeeCategory(categoryId, updateData),
        onSuccess: () => {
             queryClient.invalidateQueries({ queryKey:"additionalFeeCategories"})
        }
     })
}
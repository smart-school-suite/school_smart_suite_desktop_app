import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAdditionalFeeCategory } from "../../services/additionalFee";

export const useCreateAdditionalFeeCategory = () => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:createAdditionalFeeCategory,
         onSuccess: () => {
             queryClient.invalidateQueries({ queryKey:["additionalFeeCategories"] })
         } 
     });
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkPayAdditionalFee } from "../../services/additionalFee";

export const useBulkPayAdditionalFee = () => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:bulkPayAdditionalFee,
         onSuccess: () => {
            queryClient.invalidateQueries({ queryKey:["additionalFees"] })
            queryClient.invalidateQueries({ queryKey:["additionalFeeTransactions"] })
         }
     })
}
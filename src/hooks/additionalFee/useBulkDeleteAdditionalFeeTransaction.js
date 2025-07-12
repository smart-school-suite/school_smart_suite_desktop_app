import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkDeleteAdditionalFeeTransactions } from "../../services/additionalFee";

export const useBulkDeleteAdditionalFeeTransaction = () => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:bulkDeleteAdditionalFeeTransactions,
         onSuccess:() => {
             queryClient.invalidateQueries({ queryKey:["additionalFeeTransactions"]})
         }
     })
}
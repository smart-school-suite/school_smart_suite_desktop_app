import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkReverseAdditionalFeeTransactions } from "../../services/additionalFee";

export const useBulkReverseAdditionalFeeTransactions = () => {
     const queryClient = useQueryClient();
     return useMutation({ 
        mutationFn:bulkReverseAdditionalFeeTransactions,
        onSuccess:() => {
             queryClient.invalidateQueries({ queryKey:["additionalFeeTransactions"]})
             queryClient.invalidateQueries({ queryKey:["additionalFees"]})
        }
     });
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkReverseTransaction } from "../../services/studentResit";

export const useBulkReverseTransactions = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn: bulkReverseTransaction,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["resitTransactions"] })
         }
    })
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reverseTransaction } from "../../services/studentResit";

export const useReverseTransaction = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:(transactionId) => reverseTransaction(transactionId),
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["resitTransactions"] })
            queryClient.invalidateQueries({ queryKey:["studentResits"] })
         }
    })
}
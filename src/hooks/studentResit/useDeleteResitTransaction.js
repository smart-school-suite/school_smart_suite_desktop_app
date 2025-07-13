import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteResitTransaction } from "../../services/studentResit";

export const useDeleteResitTransaction = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:deleteResitTransaction,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["resitTransactions"]})
         }
    })
}
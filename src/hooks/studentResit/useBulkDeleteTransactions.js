import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkDeleteStudentResitTransactions } from "../../services/studentResit";

export const useBulkDeleteResitTransactions = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:bulkDeleteStudentResitTransactions,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["resitTransactions"] })
         }
    })
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkPayStudentResit } from "../../services/studentResit";

export const useBulkPayStudentResit = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:bulkPayStudentResit,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["studentResits"] })
            queryClient.invalidateQueries({ queryKey:["resitTransactions"] })
         }
    })
}
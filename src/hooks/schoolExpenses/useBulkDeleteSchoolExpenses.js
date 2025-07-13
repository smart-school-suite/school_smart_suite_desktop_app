import { bulkDeleteSchoolExpenses } from "../../services/schoolExpenses";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useBulkDeleteSchoolExpenses = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:bulkDeleteSchoolExpenses,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["schoolExpenses"] })
         }
    })
}
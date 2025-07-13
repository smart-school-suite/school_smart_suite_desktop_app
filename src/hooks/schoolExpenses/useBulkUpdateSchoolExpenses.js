import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkUpdateSchoolExpenses } from "../../services/schoolExpenses";

export const useBulkUpdateSchoolExpenses = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:bulkUpdateSchoolExpenses,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["schoolExpenses"] })
         }
    })
}
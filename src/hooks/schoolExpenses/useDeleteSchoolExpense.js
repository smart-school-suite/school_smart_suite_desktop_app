import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteExpense } from "../../services/schoolExpenses";

export const useDeleteSchoolExpense = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:deleteExpense,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["schoolExpenses"] })
         }
    })
}
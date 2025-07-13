import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createExpense } from "../../services/schoolExpenses";

export const useCreateSchoolExpense = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn: createExpense,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["schoolExpenses"] })
         }
    })
}
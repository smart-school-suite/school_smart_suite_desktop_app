import { updateExpense } from "../../services/schoolExpenses";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateExpense = () => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:({ expenseId, updateData }) => updateExpense(expenseId, updateData),
         onSuccess:(expenseId) => {
            queryClient.invalidateQueries({ queryKey:["schoolExpenses"]})
            queryClient.removeQueries({ queryKey:["schoolExpense", expenseId]})
         }
     })
}
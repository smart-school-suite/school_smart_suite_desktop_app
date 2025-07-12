import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteExpenseCategory } from "../../services/expensesCategory";

export const useDeleteExpenseCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:deleteExpenseCategory,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["expensesCategories"]})
         }
    })
}
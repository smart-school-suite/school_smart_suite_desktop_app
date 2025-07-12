import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateExpenseCategory } from "../../services/expensesCategory";

export const useUpdateExpenseCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:({ categoryId, updateData }) => updateExpenseCategory(categoryId, updateData),
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["expensesCategories"]})
         }
    })
}
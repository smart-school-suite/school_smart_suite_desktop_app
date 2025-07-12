import { createExpenseCategory } from "../../services/expensesCategory";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateExpenseCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:createExpenseCategory,
         onSuccess:() => {
            queryClient.invalidateQueries({queryKey:["expensesCategories"]})
         }
    })
}
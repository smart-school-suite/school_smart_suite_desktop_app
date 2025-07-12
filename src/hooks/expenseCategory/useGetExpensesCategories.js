import { useQuery } from "@tanstack/react-query";
import { getExpenseCategories } from "../../services/expensesCategory";

export const useGetExpensesCategories = () => {
    return useQuery({
         queryFn:getExpenseCategories,
         queryKey:["expensesCategories"]
    })
}
import { useQuery } from "@tanstack/react-query";
import { getExpensesDetails } from "../../services/schoolExpenses";

export const useGetExpenseDetails = (expenseId) => {
     return useQuery({
         queryKey:["expense", expenseId],
         queryFn:getExpensesDetails(expenseId)
     })
}
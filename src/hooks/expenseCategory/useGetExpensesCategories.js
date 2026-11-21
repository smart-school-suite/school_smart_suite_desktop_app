import { useQuery } from "@tanstack/react-query";
import { getExpenseCategories } from "../../services/expensesCategory";
import { retryUnlessEmpty } from "../../utils/query/emptyList";

export const useGetExpensesCategories = (options = {}) => {
  return useQuery({
    queryFn: getExpenseCategories,
    queryKey: ["expensesCategories"],
    // Older API versions answer an empty list with 404: don't retry that.
    retry: retryUnlessEmpty,
    ...options,
  });
};

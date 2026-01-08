import { useQuery } from "@tanstack/react-query";
import { getSchoolExpenseCategory } from "../../services/financialAnalytics";

export const useGetSchoolExpenseTotalByCategory =  (year) => {
     return useQuery({
         queryKey:["schoolExpenseTotalByCategory", year],
         queryFn:() =>  getSchoolExpenseCategory(year)
     })
}
import { getMonthlySchoolExpense } from "../../services/financialAnalytics";
import { useQuery } from "@tanstack/react-query";

export const useGetMonthlySchoolExpense =  (year) => {
     return useQuery({
         queryKey:["monthlySchoolExpense", year],
         queryFn:() => getMonthlySchoolExpense(year)
     })
}
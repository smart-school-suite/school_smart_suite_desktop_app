import { useQuery } from "@tanstack/react-query";
import { getCardStats } from "../../services/financialAnalytics";

export const useGetCardStats = (year) => {
     return useQuery({
         queryKey:["cardStats", year],
         queryFn:() =>  getCardStats(year)
     })
}
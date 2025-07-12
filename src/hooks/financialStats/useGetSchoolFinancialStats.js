import { getSchoolFinancialStats } from "../../services/financialStat";
import { useQuery } from "@tanstack/react-query";

export const useGetSchoolFinancialStats = (year) => {
    return useQuery({
         queryKey:["schoolFinancialStats"],
         queryFn:getSchoolFinancialStats(year),
         enabled:!!year
    })
}
import { useQuery } from "@tanstack/react-query";
import { getSchoolRevenueSource } from "../../services/financialAnalytics";

export const useGetSchoolRevenueSource = async (year) => {
     return useQuery({
         queryKey:["schoolRevenueSource", year],
         queryFn:() => getSchoolRevenueSource(year)
     })
}
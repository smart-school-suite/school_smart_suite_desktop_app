import { getSchoolFailRate } from "../../services/academicAnalytics";
import { useQuery } from "@tanstack/react-query";

export const useGetSchoolFailRate = (year) => {
     return useQuery({
         queryKey:["schoolFailRate", year],
         queryFn:() => getSchoolFailRate(year)
     })
}
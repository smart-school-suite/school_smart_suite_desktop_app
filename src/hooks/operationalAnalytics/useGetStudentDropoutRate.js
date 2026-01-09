import { getStudentDropoutRate } from "../../services/operationalAnalytics";
import { useQuery } from "@tanstack/react-query";

export const useGetStudentDropoutRate = (year) => {
    return useQuery({
         queryKey:["studentDropoutRate", year],
         queryFn: () => getStudentDropoutRate(year)
    })
}
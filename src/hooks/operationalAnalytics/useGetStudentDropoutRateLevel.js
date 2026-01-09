import { useQuery } from "@tanstack/react-query";
import { getStudentDropoutRateLevel } from "../../services/operationalAnalytics";

export const useGetStudentDropoutRateLevel =  (year) => {
      return useQuery({
         queryKey:["studentDropoutRateLevel", year],
         queryFn:() => getStudentDropoutRateLevel(year)
      })
}
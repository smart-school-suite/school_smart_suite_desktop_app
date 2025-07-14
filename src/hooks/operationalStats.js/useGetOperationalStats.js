import { getSchoolOperationalStats } from "../../services/operationalStat";
import { useQuery } from "@tanstack/react-query";

export const useGetSchoolOperationalStats = (year) => {
    return useQuery({
         queryKey:["operationalStats", year],
         queryFn:getSchoolOperationalStats(year),
         enabled:!!year
    })
}
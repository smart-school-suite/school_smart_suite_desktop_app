import { useQuery } from "@tanstack/react-query";
import { getCardStats } from "../../services/operationalAnalytics";

export const useGetCardStats = () => {
      return useQuery({
         queryKey:["operationalCardStats"],
         queryFn:() => getCardStats()
      })
}
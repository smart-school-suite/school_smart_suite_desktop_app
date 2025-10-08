import { useQuery } from "@tanstack/react-query";
import { getApplicationDetails } from "../../services/electionApplication";

export const useGetApplicationDetails = (applicationId) => {
      return useQuery({
         queryKey:['application', applicationId],
         queryFn:() => getApplicationDetails(applicationId),
         enabled:!!applicationId
      })
}
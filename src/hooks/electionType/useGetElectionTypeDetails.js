import { useQuery } from "@tanstack/react-query";
import { getElectionTypeDetails } from "../../services/electionType";

export const useGetElectionTypeDetails = (electionTypeId) => {
     return useQuery({
         queryKey:["electionType", electionTypeId],
         queryFn:() => getElectionTypeDetails(electionTypeId)
     })
}
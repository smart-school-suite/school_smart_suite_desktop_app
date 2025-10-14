import { useQuery } from "@tanstack/react-query";
import { getPastElectionsResults } from "../../services/election";

export const useGetPastElectionResults = (electionId) => {
     return useQuery({
         queryKey:["pastElectionResults", electionId],
         queryFn:() => getPastElectionsResults(electionId)
     })
}
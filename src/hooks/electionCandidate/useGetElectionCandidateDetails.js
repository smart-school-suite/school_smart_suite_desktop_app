import { useQuery } from "@tanstack/react-query";
import { getElectionCandidateDetails } from "../../services/electionCandidate";

export const useGetElectionCandidateDetails = (candidateId) =>{ 
     return useQuery({
         queryKey:["electionCandidate", candidateId],
         queryFn:() => getElectionCandidateDetails(candidateId)
     })
}
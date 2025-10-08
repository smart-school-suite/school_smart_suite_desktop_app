import { getElectionCandidateDetails } from "../../services/electionCandidate";
import { useQuery } from "@tanstack/react-query";

export const useGetElectionCandidateDetails = (candidateId) =>{ 
     return useQuery({
         queryKey:["electionCandidate", candidateId],
         queryFn:() => getElectionCandidateDetails(candidateId)
     })
}
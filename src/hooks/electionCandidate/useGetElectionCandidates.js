import { useQuery } from "@tanstack/react-query";
import { getElectionCandidates } from "../../services/electionCandidate";

export const useGetElectionCandidates = () => {
      return useQuery({ 
        queryKey:["electionCandidates"],
        queryFn:() => getElectionCandidates()
      })
}


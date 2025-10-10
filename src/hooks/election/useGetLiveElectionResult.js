import { useQuery } from "@tanstack/react-query";
import { getLiveElectionResults } from "../../services/election";

export const useGetLiveElectionResults = (electionId) => {
     return useQuery({
          queryKey:["liveElectionResults", electionId],
          queryFn:() => getLiveElectionResults(electionId),
          enabled:!!electionId
     })
}
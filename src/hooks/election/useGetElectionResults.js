import { useQuery } from "@tanstack/react-query";
import { getElectionResults } from "../../services/election";

export const useGetElectionResults = (electionId) => {
    return useQuery({
        queryKey: ["electionResults", electionId],
        queryFn: () => getElectionResults(electionId),
        enabled: !!electionId,
      });
}
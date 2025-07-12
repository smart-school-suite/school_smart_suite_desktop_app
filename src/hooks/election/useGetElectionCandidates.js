import { useQuery} from "@tanstack/react-query";
import { getElectionCandidates } from "../../services/election";

export const useGetElectionCandidates = (electionId) => {
  return useQuery({
    queryKey: ["electionCandidates", electionId],
    queryFn: () => getElectionCandidates(electionId),
    enabled: !!electionId,
  });
}
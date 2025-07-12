import { useQuery } from "@tanstack/react-query";
import { getCurrentElectionWinners } from "../../services/election";

export const useGetCurrentElectionWinners = (electionId) => {
  return useQuery({
    queryKey: ["currentElectionWinners", electionId],
    queryFn: () => getCurrentElectionWinners(electionId),
    enabled: !!electionId,
  });
};

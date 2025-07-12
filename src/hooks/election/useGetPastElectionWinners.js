import { useQuery } from "@tanstack/react-query";
import { getPastElectionWinners } from "../../services/election";

export const useGetPastElectionWinners = () => {
    return useQuery({
        queryKey: ["pastElectionWinners"],
        queryFn: getPastElectionWinners,
      });
}
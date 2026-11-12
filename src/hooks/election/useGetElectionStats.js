import { useQuery } from "@tanstack/react-query";
import { getElectionStats } from "../../services/election";
import { electionKeys } from "../election/electionQueryKeys";

export const useGetElectionStats = (year, options = {}) =>
  useQuery({
    queryKey: electionKeys.stats(year),
    queryFn: () => getElectionStats(year),
    enabled: Boolean(year),
    ...options,
  });

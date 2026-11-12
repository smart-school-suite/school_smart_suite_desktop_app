import { useQuery } from "@tanstack/react-query";
import { getElectionResults } from "../../services/election";
import { electionKeys } from "../election/electionQueryKeys";

export const useGetElectionResults = (electionId, options = {}) =>
  useQuery({
    queryKey: electionKeys.results(electionId),
    queryFn: () => getElectionResults(electionId),
    enabled: Boolean(electionId),
    ...options,
  });

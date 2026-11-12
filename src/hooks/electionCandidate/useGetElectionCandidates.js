import { useQuery } from "@tanstack/react-query";
import { getElectionCandidates } from "../../services/electionCandidate";
import { electionKeys } from "../election/electionQueryKeys";

export const useGetElectionCandidates = (filters = {}, options = {}) =>
  useQuery({
    queryKey: electionKeys.candidates(filters),
    queryFn: () => getElectionCandidates(filters),
    ...options,
  });

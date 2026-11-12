import { useQuery } from "@tanstack/react-query";
import { getElectionCandidateDetails } from "../../services/electionCandidate";
import { electionKeys } from "../election/electionQueryKeys";

export const useGetElectionCandidateDetails = (candidateId, options = {}) =>
  useQuery({
    queryKey: electionKeys.candidate(candidateId),
    queryFn: () => getElectionCandidateDetails(candidateId),
    enabled: Boolean(candidateId),
    ...options,
  });

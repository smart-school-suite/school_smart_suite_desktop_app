import { useQuery } from "@tanstack/react-query";
import { getElectionBallot } from "../../services/electionCandidate";
import { electionKeys } from "../election/electionQueryKeys";

export const useGetElectionBallot = (electionId, options = {}) =>
  useQuery({
    queryKey: electionKeys.ballot(electionId),
    queryFn: () => getElectionBallot(electionId),
    enabled: Boolean(electionId),
    ...options,
  });

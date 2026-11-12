import { useQuery } from "@tanstack/react-query";
import { getElectionDetails } from "../../services/election";
import { electionKeys } from "../election/electionQueryKeys";

export const useGetElectionDetails = (electionId, options = {}) =>
  useQuery({
    queryKey: electionKeys.election(electionId),
    queryFn: () => getElectionDetails(electionId),
    enabled: Boolean(electionId),
    ...options,
  });

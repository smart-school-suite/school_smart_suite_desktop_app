import { useQuery } from "@tanstack/react-query";
import { getElectionParticipants } from "../../services/election";
import { electionKeys } from "../election/electionQueryKeys";

export const useGetElectionParticipants = (electionId, params = {}, options = {}) =>
  useQuery({
    queryKey: electionKeys.participants(electionId, params),
    queryFn: () => getElectionParticipants({ electionId, params }),
    enabled: Boolean(electionId),
    placeholderData: (previous) => previous,
    ...options,
  });

import { useQuery } from "@tanstack/react-query";
import { getParticipantElectionHistory } from "../../services/electionOffice";
import { electionKeys } from "../election/electionQueryKeys";

export const useGetParticipantElectionHistory = (participantType, participantId, options = {}) =>
  useQuery({
    queryKey: electionKeys.participantHistory(participantType, participantId),
    queryFn: () => getParticipantElectionHistory({ participantType, participantId }),
    enabled: Boolean(participantType && participantId),
    ...options,
  });

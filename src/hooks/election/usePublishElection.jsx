import { publishElection } from "../../services/election";
import { closeAfter, useElectionMutation } from "../election/useElectionMutation";
import { ELECTION_STATE_KEYS } from "../election/electionQueryKeys";

export const usePublishElection = (handleClose) =>
  useElectionMutation({
    mutationFn: publishElection,
    invalidate: [
      ...ELECTION_STATE_KEYS,
    ],
    successTitle: "Election Published",
    successDescription: "Participants can now follow the election schedule.",
    onSuccess: closeAfter(handleClose),
  });

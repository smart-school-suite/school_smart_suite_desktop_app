import { cancelElection } from "../../services/election";
import { closeAfter, useElectionMutation } from "../election/useElectionMutation";
import { ELECTION_STATE_KEYS } from "../election/electionQueryKeys";

export const useCancelElection = (handleClose) =>
  useElectionMutation({
    mutationFn: cancelElection,
    invalidate: [
      ...ELECTION_STATE_KEYS,
    ],
    successTitle: "Election Cancelled",
    successDescription: "The election was cancelled. Its history is kept.",
    onSuccess: closeAfter(handleClose),
  });

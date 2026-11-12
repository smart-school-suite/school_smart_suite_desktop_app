import { castVote } from "../../services/election";
import { closeAfter, useElectionMutation } from "../election/useElectionMutation";
import { ELECTION_STATE_KEYS } from "../election/electionQueryKeys";

export const useCastVote = (handleClose) =>
  useElectionMutation({
    mutationFn: castVote,
    invalidate: [
      ...ELECTION_STATE_KEYS,
    ],
    successTitle: "Vote Cast",
    successDescription: "Your ballot was recorded.",
    onSuccess: closeAfter(handleClose),
  });

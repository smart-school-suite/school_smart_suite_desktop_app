import { closeElectionVoting } from "../../services/election";
import { closeAfter, useElectionMutation } from "../election/useElectionMutation";
import { ELECTION_STATE_KEYS } from "../election/electionQueryKeys";

export const useCloseElectionVoting = (handleClose) =>
  useElectionMutation({
    mutationFn: closeElectionVoting,
    invalidate: [
      ...ELECTION_STATE_KEYS,
    ],
    successTitle: "Voting Closed",
    successDescription: "No more ballots can be cast. Review the results and publish them.",
    onSuccess: closeAfter(handleClose),
  });

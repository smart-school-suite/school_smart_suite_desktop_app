import { updateElection } from "../../services/election";
import { closeAfter, useElectionMutation } from "../election/useElectionMutation";
import { ELECTION_STATE_KEYS } from "../election/electionQueryKeys";

export const useUpdateElection = (handleClose) =>
  useElectionMutation({
    mutationFn: updateElection,
    invalidate: [
      ...ELECTION_STATE_KEYS,
    ],
    successTitle: "Election Updated",
    successDescription: "Your changes to the election were saved.",
    onSuccess: closeAfter(handleClose),
  });

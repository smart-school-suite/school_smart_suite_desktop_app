import { createElection } from "../../services/election";
import { closeAfter, useElectionMutation } from "../election/useElectionMutation";
import { ELECTION_STATE_KEYS } from "../election/electionQueryKeys";

export const useCreateElection = (handleClose) =>
  useElectionMutation({
    mutationFn: createElection,
    invalidate: [
      ...ELECTION_STATE_KEYS,
    ],
    successTitle: "Election Created",
    successDescription: "The election was saved as a draft. Publish it when it is ready.",
    onSuccess: closeAfter(handleClose),
  });

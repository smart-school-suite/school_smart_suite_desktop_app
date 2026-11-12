import { deleteElection } from "../../services/election";
import { closeAfter, useElectionMutation } from "../election/useElectionMutation";
import { ELECTION_STATE_KEYS } from "../election/electionQueryKeys";

export const useDeleteElection = (handleClose) =>
  useElectionMutation({
    mutationFn: deleteElection,
    invalidate: [
      ...ELECTION_STATE_KEYS,
    ],
    successTitle: "Election Deleted",
    successDescription: "The election was deleted.",
    onSuccess: closeAfter(handleClose),
  });

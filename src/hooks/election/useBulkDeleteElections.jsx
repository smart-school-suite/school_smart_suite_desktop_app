import { bulkDeleteElection } from "../../services/election";
import { closeAfter, useElectionMutation } from "../election/useElectionMutation";
import { ELECTION_STATE_KEYS } from "../election/electionQueryKeys";

export const useBulkDeleteElections = (handleClose, resetAll) =>
  useElectionMutation({
    mutationFn: bulkDeleteElection,
    invalidate: [
      ...ELECTION_STATE_KEYS,
    ],
    successTitle: "Elections Deleted",
    successDescription: "The selected elections were deleted.",
    onSuccess: closeAfter(handleClose, resetAll),
  });

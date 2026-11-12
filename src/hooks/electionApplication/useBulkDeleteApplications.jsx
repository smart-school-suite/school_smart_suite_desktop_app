import { bulkDeleteApplications } from "../../services/electionApplication";
import { closeAfter, useElectionMutation } from "../election/useElectionMutation";
import { ELECTION_STATE_KEYS } from "../election/electionQueryKeys";

export const useBulkDeleteApplications = (handleClose, resetAll) =>
  useElectionMutation({
    mutationFn: bulkDeleteApplications,
    invalidate: [
      ["electionApplications"],
      ["electionApplication"],
      ["electionCandidates"],
      ["electionBallot"],
      ...ELECTION_STATE_KEYS,
    ],
    successTitle: "Applications Deleted",
    successDescription: "The selected applications were deleted.",
    onSuccess: closeAfter(handleClose, resetAll),
  });

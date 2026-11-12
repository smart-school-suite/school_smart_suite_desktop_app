import { bulkRejectApplications } from "../../services/electionApplication";
import { closeAfter, useElectionMutation } from "../election/useElectionMutation";
import { ELECTION_STATE_KEYS } from "../election/electionQueryKeys";

export const useBulkRejectApplications = (handleClose, resetAll) =>
  useElectionMutation({
    mutationFn: bulkRejectApplications,
    invalidate: [
      ["electionApplications"],
      ["electionApplication"],
      ["electionCandidates"],
      ["electionBallot"],
      ...ELECTION_STATE_KEYS,
    ],
    successTitle: "Applications Rejected",
    successDescription: "The selected applications were rejected.",
    onSuccess: closeAfter(handleClose, resetAll),
  });

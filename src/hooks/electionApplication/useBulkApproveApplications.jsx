import { bulkApproveApplications } from "../../services/electionApplication";
import { closeAfter, useElectionMutation } from "../election/useElectionMutation";
import { ELECTION_STATE_KEYS } from "../election/electionQueryKeys";

export const useBulkApproveApplications = (handleClose, resetAll) =>
  useElectionMutation({
    mutationFn: bulkApproveApplications,
    invalidate: [
      ["electionApplications"],
      ["electionApplication"],
      ["electionCandidates"],
      ["electionBallot"],
      ...ELECTION_STATE_KEYS,
    ],
    successTitle: "Applications Approved",
    successDescription: "The selected applicants are now candidates.",
    onSuccess: closeAfter(handleClose, resetAll),
  });

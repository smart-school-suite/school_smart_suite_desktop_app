import { bulkDeleteElectionRole } from "../../services/electionRole";
import { closeAfter, useElectionMutation } from "../election/useElectionMutation";
import { ELECTION_STATE_KEYS } from "../election/electionQueryKeys";

export const useBulkDeleteElectionRole = (handleClose, resetAll) =>
  useElectionMutation({
    mutationFn: bulkDeleteElectionRole,
    invalidate: [
      ["electionRoles"],
      ["electionRole"],
      ["electionRolesByElection"],
      ["electionTypes"],
      ["electionType"],
      ...ELECTION_STATE_KEYS,
    ],
    successTitle: "Positions Deleted",
    successDescription: "The selected positions were deleted.",
    onSuccess: closeAfter(handleClose, resetAll),
  });

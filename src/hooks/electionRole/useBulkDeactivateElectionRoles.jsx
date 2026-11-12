import { bulkDeactivateElectionRole } from "../../services/electionRole";
import { closeAfter, useElectionMutation } from "../election/useElectionMutation";
import { ELECTION_STATE_KEYS } from "../election/electionQueryKeys";

export const useBulkDeactivateElectionRole = (handleClose, resetAll) =>
  useElectionMutation({
    mutationFn: bulkDeactivateElectionRole,
    invalidate: [
      ["electionRoles"],
      ["electionRole"],
      ["electionRolesByElection"],
      ["electionTypes"],
      ["electionType"],
      ...ELECTION_STATE_KEYS,
    ],
    successTitle: "Positions Deactivated",
    successDescription: "The selected positions were deactivated.",
    onSuccess: closeAfter(handleClose, resetAll),
  });

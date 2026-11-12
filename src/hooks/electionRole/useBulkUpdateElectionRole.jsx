import { bulkUpdateElectionRole } from "../../services/electionRole";
import { closeAfter, useElectionMutation } from "../election/useElectionMutation";
import { ELECTION_STATE_KEYS } from "../election/electionQueryKeys";

export const useBulkUpdateElectionRoles = (handleClose, resetAll) =>
  useElectionMutation({
    mutationFn: bulkUpdateElectionRole,
    invalidate: [
      ["electionRoles"],
      ["electionRole"],
      ["electionRolesByElection"],
      ["electionTypes"],
      ["electionType"],
      ...ELECTION_STATE_KEYS,
    ],
    successTitle: "Positions Updated",
    successDescription: "The selected positions were updated.",
    onSuccess: closeAfter(handleClose, resetAll),
  });

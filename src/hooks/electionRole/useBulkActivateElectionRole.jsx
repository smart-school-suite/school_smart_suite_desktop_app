import { bulkActivateElectionRole } from "../../services/electionRole";
import { closeAfter, useElectionMutation } from "../election/useElectionMutation";
import { ELECTION_STATE_KEYS } from "../election/electionQueryKeys";

export const useBulkActivateElectionRole = (handleClose, resetAll) =>
  useElectionMutation({
    mutationFn: bulkActivateElectionRole,
    invalidate: [
      ["electionRoles"],
      ["electionRole"],
      ["electionRolesByElection"],
      ["electionTypes"],
      ["electionType"],
      ...ELECTION_STATE_KEYS,
    ],
    successTitle: "Positions Activated",
    successDescription: "The selected positions were activated.",
    onSuccess: closeAfter(handleClose, resetAll),
  });

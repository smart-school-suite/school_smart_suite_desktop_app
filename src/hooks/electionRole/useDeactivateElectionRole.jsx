import { deactivateElectionRole } from "../../services/electionRole";
import { closeAfter, useElectionMutation } from "../election/useElectionMutation";
import { ELECTION_STATE_KEYS } from "../election/electionQueryKeys";

export const useDeactivateElectionRole = (handleClose) =>
  useElectionMutation({
    mutationFn: deactivateElectionRole,
    invalidate: [
      ["electionRoles"],
      ["electionRole"],
      ["electionRolesByElection"],
      ["electionTypes"],
      ["electionType"],
      ...ELECTION_STATE_KEYS,
    ],
    successTitle: "Position Deactivated",
    successDescription: "The position will not be offered in new elections.",
    onSuccess: closeAfter(handleClose),
  });

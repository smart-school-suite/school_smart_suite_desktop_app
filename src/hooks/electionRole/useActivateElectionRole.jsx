import { activateElectionRole } from "../../services/electionRole";
import { closeAfter, useElectionMutation } from "../election/useElectionMutation";
import { ELECTION_STATE_KEYS } from "../election/electionQueryKeys";

export const useActivateElectionRole = (handleClose) =>
  useElectionMutation({
    mutationFn: activateElectionRole,
    invalidate: [
      ["electionRoles"],
      ["electionRole"],
      ["electionRolesByElection"],
      ["electionTypes"],
      ["electionType"],
      ...ELECTION_STATE_KEYS,
    ],
    successTitle: "Position Activated",
    successDescription: "The position is open for new elections.",
    onSuccess: closeAfter(handleClose),
  });

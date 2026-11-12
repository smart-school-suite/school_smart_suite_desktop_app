import { updateElectionRole } from "../../services/electionRole";
import { closeAfter, useElectionMutation } from "../election/useElectionMutation";
import { ELECTION_STATE_KEYS } from "../election/electionQueryKeys";

export const useUpdateElectionRole = (handleClose) =>
  useElectionMutation({
    mutationFn: updateElectionRole,
    invalidate: [
      ["electionRoles"],
      ["electionRole"],
      ["electionRolesByElection"],
      ["electionTypes"],
      ["electionType"],
      ...ELECTION_STATE_KEYS,
    ],
    successTitle: "Position Updated",
    successDescription: "Your changes to the position were saved.",
    onSuccess: closeAfter(handleClose),
  });

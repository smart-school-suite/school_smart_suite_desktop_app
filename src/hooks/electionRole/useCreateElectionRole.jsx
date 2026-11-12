import { createElectionRole } from "../../services/electionRole";
import { closeAfter, useElectionMutation } from "../election/useElectionMutation";
import { ELECTION_STATE_KEYS } from "../election/electionQueryKeys";

export const useCreateElectionRole = (handleClose) =>
  useElectionMutation({
    mutationFn: createElectionRole,
    invalidate: [
      ["electionRoles"],
      ["electionRole"],
      ["electionRolesByElection"],
      ["electionTypes"],
      ["electionType"],
      ...ELECTION_STATE_KEYS,
    ],
    successTitle: "Position Created",
    successDescription: "The position is ready to be contested.",
    onSuccess: closeAfter(handleClose),
  });

import { deleteElectionRole } from "../../services/electionRole";
import { closeAfter, useElectionMutation } from "../election/useElectionMutation";
import { ELECTION_STATE_KEYS } from "../election/electionQueryKeys";

export const useDeleteElectionRole = (handleClose) =>
  useElectionMutation({
    mutationFn: deleteElectionRole,
    invalidate: [
      ["electionRoles"],
      ["electionRole"],
      ["electionRolesByElection"],
      ["electionTypes"],
      ["electionType"],
      ...ELECTION_STATE_KEYS,
    ],
    successTitle: "Position Deleted",
    successDescription: "The position was deleted.",
    onSuccess: closeAfter(handleClose),
  });

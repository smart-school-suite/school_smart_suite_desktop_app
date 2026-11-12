import { configureOfficeTerm } from "../../services/electionRole";
import { closeAfter, useElectionMutation } from "../election/useElectionMutation";
import { ELECTION_STATE_KEYS } from "../election/electionQueryKeys";

export const useConfigureOfficeTerm = (handleClose) =>
  useElectionMutation({
    mutationFn: configureOfficeTerm,
    invalidate: [
      ["electionRoles"],
      ["electionRole"],
      ["electionRolesByElection"],
      ["electionTypes"],
      ["electionType"],
      ...ELECTION_STATE_KEYS,
    ],
    successTitle: "Office Term Saved",
    successDescription: "Tenure rules for this position were updated.",
    onSuccess: closeAfter(handleClose),
  });

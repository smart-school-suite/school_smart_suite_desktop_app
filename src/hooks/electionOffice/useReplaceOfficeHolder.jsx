import { replaceOfficeHolder } from "../../services/electionOffice";
import { closeAfter, useElectionMutation } from "../election/useElectionMutation";
import { ELECTION_STATE_KEYS } from "../election/electionQueryKeys";

export const useReplaceOfficeHolder = (handleClose) =>
  useElectionMutation({
    mutationFn: replaceOfficeHolder,
    invalidate: [
      ["officeHolders"],
      ["officeHolder"],
      ["participantElectionHistory"],
      ["electionRole"],
      ...ELECTION_STATE_KEYS,
    ],
    successTitle: "Office Holder Replaced",
    successDescription: "The replacement serves the remaining tenure.",
    onSuccess: closeAfter(handleClose),
  });

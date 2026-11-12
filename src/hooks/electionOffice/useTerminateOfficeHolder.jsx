import { terminateOfficeHolder } from "../../services/electionOffice";
import { closeAfter, useElectionMutation } from "../election/useElectionMutation";
import { ELECTION_STATE_KEYS } from "../election/electionQueryKeys";

export const useTerminateOfficeHolder = (handleClose) =>
  useElectionMutation({
    mutationFn: terminateOfficeHolder,
    invalidate: [
      ["officeHolders"],
      ["officeHolder"],
      ["participantElectionHistory"],
      ["electionRole"],
      ...ELECTION_STATE_KEYS,
    ],
    successTitle: "Tenure Ended",
    successDescription: "The tenure was ended and kept in the office history.",
    onSuccess: closeAfter(handleClose),
  });

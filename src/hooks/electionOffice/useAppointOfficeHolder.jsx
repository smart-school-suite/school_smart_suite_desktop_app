import { appointOfficeHolder } from "../../services/electionOffice";
import { closeAfter, useElectionMutation } from "../election/useElectionMutation";
import { ELECTION_STATE_KEYS } from "../election/electionQueryKeys";

export const useAppointOfficeHolder = (handleClose) =>
  useElectionMutation({
    mutationFn: appointOfficeHolder,
    invalidate: [
      ["officeHolders"],
      ["officeHolder"],
      ["participantElectionHistory"],
      ["electionRole"],
      ...ELECTION_STATE_KEYS,
    ],
    successTitle: "Office Holder Appointed",
    successDescription: "The appointment and its tenure years were recorded.",
    onSuccess: closeAfter(handleClose),
  });

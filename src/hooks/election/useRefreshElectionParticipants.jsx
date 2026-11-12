import { refreshElectionParticipants } from "../../services/election";
import { closeAfter, useElectionMutation } from "../election/useElectionMutation";
import { ELECTION_STATE_KEYS } from "../election/electionQueryKeys";

export const useRefreshElectionParticipants = (handleClose) =>
  useElectionMutation({
    mutationFn: refreshElectionParticipants,
    invalidate: [
      ["electionParticipants"],
      ...ELECTION_STATE_KEYS,
    ],
    successTitle: "Participants Refreshed",
    successDescription: "Eligibility now includes everyone who currently matches the configuration.",
    onSuccess: closeAfter(handleClose),
  });

import { configureElectionParticipants } from "../../services/election";
import { closeAfter, useElectionMutation } from "../election/useElectionMutation";
import { ELECTION_STATE_KEYS } from "../election/electionQueryKeys";

export const useConfigureElectionParticipants = (handleClose) =>
  useElectionMutation({
    mutationFn: configureElectionParticipants,
    invalidate: [
      ["electionParticipants"],
      ...ELECTION_STATE_KEYS,
    ],
    successTitle: "Participants Saved",
    successDescription: "Voter and candidate eligibility was updated.",
    onSuccess: closeAfter(handleClose),
  });

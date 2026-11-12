import { copyElectionParticipants } from "../../services/election";
import { closeAfter, useElectionMutation } from "../election/useElectionMutation";
import { ELECTION_STATE_KEYS } from "../election/electionQueryKeys";

export const useCopyElectionParticipants = (handleClose) =>
  useElectionMutation({
    mutationFn: copyElectionParticipants,
    invalidate: [
      ["electionParticipants"],
      ...ELECTION_STATE_KEYS,
    ],
    successTitle: "Participants Copied",
    successDescription: "The participant configuration was copied from the selected election.",
    onSuccess: closeAfter(handleClose),
  });

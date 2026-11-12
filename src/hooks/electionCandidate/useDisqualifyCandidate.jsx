import { disqualifyCandidate } from "../../services/electionCandidate";
import { closeAfter, useElectionMutation } from "../election/useElectionMutation";
import { ELECTION_STATE_KEYS } from "../election/electionQueryKeys";

export const useDisqualifyCandidate = (handleClose) =>
  useElectionMutation({
    mutationFn: disqualifyCandidate,
    invalidate: [
      ["electionCandidates"],
      ["electionCandidate"],
      ["electionBallot"],
      ...ELECTION_STATE_KEYS,
    ],
    successTitle: "Candidate Disqualified",
    successDescription: "The candidate no longer appears on the ballot.",
    onSuccess: closeAfter(handleClose),
  });

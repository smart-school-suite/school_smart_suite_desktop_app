import { reinstateCandidate } from "../../services/electionCandidate";
import { closeAfter, useElectionMutation } from "../election/useElectionMutation";
import { ELECTION_STATE_KEYS } from "../election/electionQueryKeys";

export const useReinstateCandidate = (handleClose) =>
  useElectionMutation({
    mutationFn: reinstateCandidate,
    invalidate: [
      ["electionCandidates"],
      ["electionCandidate"],
      ["electionBallot"],
      ...ELECTION_STATE_KEYS,
    ],
    successTitle: "Candidate Reinstated",
    successDescription: "The candidate is back on the ballot.",
    onSuccess: closeAfter(handleClose),
  });

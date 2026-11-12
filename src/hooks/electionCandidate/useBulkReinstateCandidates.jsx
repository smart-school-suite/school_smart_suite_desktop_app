import { bulkReinstateCandidates } from "../../services/electionCandidate";
import { closeAfter, useElectionMutation } from "../election/useElectionMutation";
import { ELECTION_STATE_KEYS } from "../election/electionQueryKeys";

export const useBulkReinstateCandidates = (handleClose, resetAll) =>
  useElectionMutation({
    mutationFn: bulkReinstateCandidates,
    invalidate: [
      ["electionCandidates"],
      ["electionCandidate"],
      ["electionBallot"],
      ...ELECTION_STATE_KEYS,
    ],
    successTitle: "Candidates Reinstated",
    successDescription: "The selected candidates were reinstated.",
    onSuccess: closeAfter(handleClose, resetAll),
  });

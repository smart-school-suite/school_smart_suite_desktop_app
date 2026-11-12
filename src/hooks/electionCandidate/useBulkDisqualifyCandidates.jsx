import { bulkDisqualifyCandidates } from "../../services/electionCandidate";
import { closeAfter, useElectionMutation } from "../election/useElectionMutation";
import { ELECTION_STATE_KEYS } from "../election/electionQueryKeys";

export const useBulkDisqualifyCandidates = (handleClose, resetAll) =>
  useElectionMutation({
    mutationFn: bulkDisqualifyCandidates,
    invalidate: [
      ["electionCandidates"],
      ["electionCandidate"],
      ["electionBallot"],
      ...ELECTION_STATE_KEYS,
    ],
    successTitle: "Candidates Disqualified",
    successDescription: "The selected candidates were disqualified.",
    onSuccess: closeAfter(handleClose, resetAll),
  });

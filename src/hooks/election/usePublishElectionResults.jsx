import { publishElectionResults } from "../../services/election";
import { closeAfter, useElectionMutation } from "../election/useElectionMutation";
import { ELECTION_STATE_KEYS } from "../election/electionQueryKeys";

export const usePublishElectionResults = (handleClose) =>
  useElectionMutation({
    mutationFn: publishElectionResults,
    invalidate: [
      ["officeHolders"],
      ["electionCandidates"],
      ...ELECTION_STATE_KEYS,
    ],
    successTitle: "Results Published",
    successDescription: "Winners are now office holders and the results are visible to participants.",
    onSuccess: closeAfter(handleClose),
  });

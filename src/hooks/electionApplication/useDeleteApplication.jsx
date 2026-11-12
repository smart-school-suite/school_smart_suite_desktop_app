import { deleteApplication } from "../../services/electionApplication";
import { closeAfter, useElectionMutation } from "../election/useElectionMutation";
import { ELECTION_STATE_KEYS } from "../election/electionQueryKeys";

export const useDeleteApplications = (handleClose) =>
  useElectionMutation({
    mutationFn: deleteApplication,
    invalidate: [
      ["electionApplications"],
      ["electionApplication"],
      ["electionCandidates"],
      ["electionBallot"],
      ...ELECTION_STATE_KEYS,
    ],
    successTitle: "Application Deleted",
    successDescription: "The application was deleted.",
    onSuccess: closeAfter(handleClose),
  });

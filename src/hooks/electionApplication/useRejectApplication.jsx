import { rejectApplication } from "../../services/electionApplication";
import { closeAfter, useElectionMutation } from "../election/useElectionMutation";
import { ELECTION_STATE_KEYS } from "../election/electionQueryKeys";

export const useRejectElectionApplication = (handleClose) =>
  useElectionMutation({
    mutationFn: rejectApplication,
    invalidate: [
      ["electionApplications"],
      ["electionApplication"],
      ["electionCandidates"],
      ["electionBallot"],
      ...ELECTION_STATE_KEYS,
    ],
    successTitle: "Application Rejected",
    successDescription: "The applicant will see your remarks.",
    onSuccess: closeAfter(handleClose),
  });

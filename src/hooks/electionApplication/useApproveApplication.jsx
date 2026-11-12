import { approveApplication } from "../../services/electionApplication";
import { closeAfter, useElectionMutation } from "../election/useElectionMutation";
import { ELECTION_STATE_KEYS } from "../election/electionQueryKeys";

export const useApproveElectionApplication = (handleClose) =>
  useElectionMutation({
    mutationFn: approveApplication,
    invalidate: [
      ["electionApplications"],
      ["electionApplication"],
      ["electionCandidates"],
      ["electionBallot"],
      ...ELECTION_STATE_KEYS,
    ],
    successTitle: "Application Approved",
    successDescription: "The applicant is now a candidate.",
    onSuccess: closeAfter(handleClose),
  });

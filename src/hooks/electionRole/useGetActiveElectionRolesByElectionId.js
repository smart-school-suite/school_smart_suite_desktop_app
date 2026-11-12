import { useQuery } from "@tanstack/react-query";
import { getActiveElectionRolesByElection } from "../../services/electionRole";
import { electionKeys } from "../election/electionQueryKeys";

export const useGetActiveElectionRolesByElectionId = (electionId, options = {}) =>
  useQuery({
    queryKey: [...electionKeys.rolesByElection(electionId), "active"],
    queryFn: () => getActiveElectionRolesByElection(electionId),
    enabled: Boolean(electionId),
    ...options,
  });

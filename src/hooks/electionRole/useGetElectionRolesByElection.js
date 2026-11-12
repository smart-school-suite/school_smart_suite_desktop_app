import { useQuery } from "@tanstack/react-query";
import { getElectionRolesByElection } from "../../services/electionRole";
import { electionKeys } from "../election/electionQueryKeys";

export const useGetElectionRolesByElection = (electionId, options = {}) =>
  useQuery({
    queryKey: electionKeys.rolesByElection(electionId),
    queryFn: () => getElectionRolesByElection(electionId),
    enabled: Boolean(electionId),
    ...options,
  });

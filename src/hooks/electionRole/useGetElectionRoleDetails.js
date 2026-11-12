import { useQuery } from "@tanstack/react-query";
import { getElectionRoleDetails } from "../../services/electionRole";
import { electionKeys } from "../election/electionQueryKeys";

export const useGetElectionRoleDetails = (electionRoleId, options = {}) =>
  useQuery({
    queryKey: electionKeys.role(electionRoleId),
    queryFn: () => getElectionRoleDetails(electionRoleId),
    enabled: Boolean(electionRoleId),
    ...options,
  });

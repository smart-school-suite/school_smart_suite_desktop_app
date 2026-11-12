import { useQuery } from "@tanstack/react-query";
import { getElectionRoles } from "../../services/electionRole";
import { electionKeys } from "../election/electionQueryKeys";

export const useGetElectionRoles = (filters = {}, options = {}) =>
  useQuery({
    queryKey: electionKeys.roles(filters),
    queryFn: () => getElectionRoles(filters),
    ...options,
  });

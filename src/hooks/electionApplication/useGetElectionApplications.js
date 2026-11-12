import { useQuery } from "@tanstack/react-query";
import { getElectionApplications } from "../../services/electionApplication";
import { electionKeys } from "../election/electionQueryKeys";

export const useGetElectionApplications = (filters = {}, options = {}) =>
  useQuery({
    queryKey: electionKeys.applications(filters),
    queryFn: () => getElectionApplications(filters),
    ...options,
  });

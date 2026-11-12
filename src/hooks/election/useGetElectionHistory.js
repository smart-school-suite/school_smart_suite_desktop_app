import { useQuery } from "@tanstack/react-query";
import { getElectionHistory } from "../../services/election";
import { electionKeys } from "../election/electionQueryKeys";

export const useGetElectionHistory = (filters = {}, options = {}) =>
  useQuery({
    queryKey: electionKeys.history(filters),
    queryFn: () => getElectionHistory(filters),
    ...options,
  });

import { useQuery } from "@tanstack/react-query";
import { getElections } from "../../services/election";
import { electionKeys } from "../election/electionQueryKeys";

export const useGetElections = (filters = {}, options = {}) =>
  useQuery({
    queryKey: electionKeys.elections(filters),
    queryFn: () => getElections(filters),
    ...options,
  });

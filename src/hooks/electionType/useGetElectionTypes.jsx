import { useQuery } from "@tanstack/react-query";
import { getElectionTypes } from "../../services/electionType";

export const useGetElectionTypes = (options = {}) =>
  useQuery({
    queryKey: ["electionTypes"],
    queryFn: getElectionTypes,
    ...options,
  });

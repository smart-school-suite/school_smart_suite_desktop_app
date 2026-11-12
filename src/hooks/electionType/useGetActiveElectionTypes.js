import { useQuery } from "@tanstack/react-query";
import { getActiveElectionTypes } from "../../services/electionType";

export const useGetActiveElectionTypes = (options = {}) =>
  useQuery({
    queryKey: ["activeElectionTypes"],
    queryFn: () => getActiveElectionTypes(),
    ...options,
  });

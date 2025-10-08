import { useQuery } from "@tanstack/react-query";
import { getActiveElectionTypes } from "../../services/electionType";

export const useGetActiveElectionTypes = () => {
  return useQuery({
    queryKey: ["activeElectionTypes"],
    queryFn: () => getActiveElectionTypes(),
  });
};

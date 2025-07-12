import { useQuery } from "@tanstack/react-query";
import { getElectionDetails } from "../../services/election";

export const useGetElectionDetails = (electionId) => {
  return useQuery({
    queryKey: ["election", electionId],
    queryFn: () => getElectionDetails(electionId),
    enabled: !!electionId,
  });
};

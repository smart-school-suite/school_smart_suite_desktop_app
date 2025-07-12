import { useQuery } from "@tanstack/react-query";
import { getAllowedParticipants } from "../../services/election";

export const useGetAllowedParticipants = (electionId) => {
     return useQuery({
        queryKey: ["allowedElectionParticipants", electionId],
        queryFn: () => getAllowedParticipants(electionId),
        enabled: !!electionId,
      });
}
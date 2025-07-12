import { useQuery } from "@tanstack/react-query";
import { getActiveRolesForElection } from "../../services/electionRole";

export const useGetActiveElectionRolesByElectionId = (electionId) => {
     return useQuery({
        queryKey: ["activeElectionRoleByElections", electionId],
        queryFn: () => getActiveRolesForElection(electionId),
        enabled: !!electionId,
      });
}
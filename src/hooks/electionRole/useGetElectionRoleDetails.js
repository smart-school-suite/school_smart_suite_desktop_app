import { useQuery } from "@tanstack/react-query";
import { getElectionRoleDetails } from "../../services/electionRole";

export const useGetElectionRoleDetails = (electionRoleId) => {
     return useQuery({
         queryKey:["electionRole", electionRoleId],
         queryFn:() => getElectionRoleDetails(electionRoleId)
     })
}
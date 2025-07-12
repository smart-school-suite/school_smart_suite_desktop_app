import { useQuery } from "@tanstack/react-query";
import { getElectionRoles } from "../../services/electionRole";

export const useGetElectionRoles = () => {
    return useQuery({
        queryKey: ['electionRoles'],
        queryFn: getElectionRoles,
      });
}
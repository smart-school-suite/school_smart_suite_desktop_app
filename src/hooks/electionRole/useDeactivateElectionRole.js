import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deactivateRole } from "../../services/electionRole";

export const useDeactivateElectionRole = () => { 
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:(electionRoleId) => deactivateRole(electionRoleId),
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["electionRoles"]})
         }
    })
}
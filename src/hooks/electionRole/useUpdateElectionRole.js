import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateElectionRole } from "../../services/electionRole";

export const useUpdateElectionRole = ( ) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:({ electionRoleId, updateData }) => updateElectionRole(electionRoleId, updateData),
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["electionRoles"]})
         }
    })
}
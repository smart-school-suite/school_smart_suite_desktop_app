import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkDeactivateRole } from "../../services/electionRole";

export const useBulkDeactivateElectionRole = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:bulkDeactivateRole,
         onSuccess:() => {
             queryClient.invalidateQueries({ queryKey:["electionRoles"]})
         }
    })
}
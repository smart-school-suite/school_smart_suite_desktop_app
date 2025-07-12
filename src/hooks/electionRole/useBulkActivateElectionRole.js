import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkActivateRole } from "../../services/electionRole";

export const useBulkActivateElectionRole = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:bulkActivateRole,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["electionRoles"]})
         }
    })
}
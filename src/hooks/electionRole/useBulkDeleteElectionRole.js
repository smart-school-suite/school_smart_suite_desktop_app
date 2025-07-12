import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkDeleteRole } from "../../services/electionRole";

export const useBulkDeleteElectionRole = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:bulkDeleteRole,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["electionRoles"]})
         }
    })
}
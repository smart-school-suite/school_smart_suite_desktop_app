import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkUpdateElectionRole } from "../../services/electionRole";

export const useBulkUpdateElectionRoles = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn: ({ updateData }) => bulkUpdateElectionRole(updateData),
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["electionRoles"]})
         }
    })
}
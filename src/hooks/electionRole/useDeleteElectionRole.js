import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteElectionRole } from "../../services/electionRole";

 const queryClient = useQueryClient();
    return useMutation({
         mutationFn:deleteElectionRole,
         onSuccess: () => {
            queryClient.invalidateQueries({ queryKey:["electionRoles"]})
         }
})
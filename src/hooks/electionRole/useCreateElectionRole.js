import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createElectionRole } from "../../services/electionRole";

export const useCreateElectionRole = () => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:createElectionRole,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["electionRoles"]})
         }
     })
}
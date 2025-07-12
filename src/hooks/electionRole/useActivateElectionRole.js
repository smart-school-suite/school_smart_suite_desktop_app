import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activateRole } from "../../services/electionRole";

export const useActivateElectionRole = () => {
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn:(electionRoleId) => activateRole(electionRoleId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey:["electionRoles"]})
      }
   })
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deactivateElectionType } from "../../services/electionType";

export const useDeactivateElectionType = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:(electionTypeId) => deactivateElectionType(electionTypeId),
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["electionTypes"]})
            queryClient.invalidateQueries({ queryKey:["activeElectionTypes"] })
         }
    })
}
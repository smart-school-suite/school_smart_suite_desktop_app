import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activateElectionType } from "../../services/electionType";

export const useActivateElectionType = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:(electionTypeId) => activateElectionType(electionTypeId),
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["electionTypes"]})
            queryClient.invalidateQueries({ queryKey:["activeElectionTypes"] })
         }
    })
}
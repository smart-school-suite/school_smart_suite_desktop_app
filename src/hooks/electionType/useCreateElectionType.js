import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createElectionType } from "../../services/electionType";

export const useCreateElectionType = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:createElectionType,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["electionTypes"]})
         }
    })
}
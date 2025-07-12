import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteElection } from "../../services/election";

export const useDeleteElection = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:deleteElection,
         onSuccess: (electionId) => {
            queryClient.invalidateQueries({ queryKey:["elections"]})
            queryClient.removeQueries({ queryKey:["election", electionId]})
         }
    })
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateElection } from "../../services/election";

export const useUpdateElection = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:({ electionId, electionData }) => updateElection(electionId, electionData),
         onSuccess: (electionId) => {
            queryClient.invalidateQueries({ queryKey:["elections"]})
            queryClient.removeQueries({ queryKey:["election", electionId]})
         }
    })
}
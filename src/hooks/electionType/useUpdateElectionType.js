import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateElectionType } from "../../services/electionType";

export const useUpdateElectionType = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:({ electionRoleId, updateData }) => updateElectionType(electionRoleId, updateData),
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["electionTypes"]})
         }
    })
}
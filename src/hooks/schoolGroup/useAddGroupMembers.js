import { addAudienceGroupMembers } from "../../services/schoolGroup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export const useAddGroupMembers = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:addAudienceGroupMembers,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["schoolGroups"] })
         }
    })
}
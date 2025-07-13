import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeAudienceGroupMembers } from "../../services/schoolGroup";

export const useRemoveGroupMembers = () => { 
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:removeAudienceGroupMembers,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["schoolGroups"] })
         }
    })
}
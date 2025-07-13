import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAudienceGroup } from "../../services/schoolGroup";

export const useUpdateGroup = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:({ groupId, updateData }) => updateAudienceGroup(groupId, updateData),
         onSuccess:(groupId) => {
            queryClient.invalidateQueries({ queryKey:["groups"]})
            queryClient.removeQueries({ queryKey:["schoolGroup", groupId] })
         }
    })
}
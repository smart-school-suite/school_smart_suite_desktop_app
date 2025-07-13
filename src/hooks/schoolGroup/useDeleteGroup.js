import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAudienceGroup } from "../../services/schoolGroup";

export const useDeleteGroup = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:deleteAudienceGroup,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["schoolGroups"] })
         }
    })
}
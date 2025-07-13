import { createAudienceGroup } from "../../services/schoolGroup";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateSchoolGroup = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:createAudienceGroup,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["schoolGroups"] })
         }
    })
}
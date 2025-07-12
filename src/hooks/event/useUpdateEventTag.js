import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEventTag } from "../../services/event";

export const useUpdateEventTag = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:({ tagId, updateData }) => updateEventTag(tagId, updateData),
         onSuccess:() => {
            queryClient.invalidateQueries({queryKey:["eventTags"]})
         }
    })
}
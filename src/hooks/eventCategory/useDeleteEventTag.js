import { deleteEventTag } from "../../services/event";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteEventTag = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:deleteEventTag,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["eventTags"]})
         }
    })
}
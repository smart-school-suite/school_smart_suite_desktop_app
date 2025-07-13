import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEventTag } from "../../services/event";

export const useCreateEventTag = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:createEventTag,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["eventTags"]})
         }
    })
}
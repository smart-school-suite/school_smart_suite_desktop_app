import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEventCategory } from "../../services/event";

export const useCreateEventCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:createEventCategory,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["eventCategories"]})
         }
    })
}
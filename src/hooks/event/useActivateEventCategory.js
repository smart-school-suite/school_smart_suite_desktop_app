import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activateEventCategory } from "../../services/event";

export const useActivateEventCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:activateEventCategory,
         onSuccess:(status) => {
            queryClient.invalidateQueries({ queryKey:["eventCategories", status]})
         }
    })
}
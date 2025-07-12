import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deactivateEventCategory } from "../../services/event";

export const useDeactivateEventCategory = () => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:deactivateEventCategory,
         onSuccess:(status) => {
             queryClient.invalidateQueries({ queryKey:["eventCategories", status]})
         }
     })
}
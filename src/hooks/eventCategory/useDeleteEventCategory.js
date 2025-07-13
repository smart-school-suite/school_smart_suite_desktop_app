import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEventCategory } from "../../services/event";

export const useDeleteEventCategory = () => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:deleteEventCategory,
         onSuccess:(status) => {
             queryClient.invalidateQueries({ queryKey:["eventCategories", status]})
         }
     })
}
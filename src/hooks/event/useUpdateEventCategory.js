import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEventCategory } from "../../services/event";

export const useUpdateEventCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:({ categoryId, updateData }) => updateEventCategory(categoryId, updateData),
         onSuccess:(status) => {
            queryClient.invalidateQueries({ queryKey:["eventCategories", status] })
         }
    })
}
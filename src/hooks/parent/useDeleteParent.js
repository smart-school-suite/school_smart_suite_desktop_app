import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteParent } from "../../services/parent";

export const useDeleteParent = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:deleteParent,
         onSuccess:(parentId) => {
            queryClient.invalidateQueries({ queryKey:["parents"]})
            queryClient.removeQueries({ queryKey:["parent", parentId] })
         }
    })
}
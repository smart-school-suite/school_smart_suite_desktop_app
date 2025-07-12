import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateParent } from "../../services/parent";

export const useUpdateParent = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:({ parentId, updateData }) => updateParent(parentId, updateData),
         onSuccess:(parentId) => {
            queryClient.invalidateQueries({queryKey:["parents"]})
            queryClient.removeQueries({ queryKey:["parent", parentId] })
         }
    })
}
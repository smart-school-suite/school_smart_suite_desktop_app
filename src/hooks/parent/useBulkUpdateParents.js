import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkUpdateParents } from "../../services/parent";

export const useBulkUpdateParents = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:bulkUpdateParents,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["parents"]})
         }
    })
}
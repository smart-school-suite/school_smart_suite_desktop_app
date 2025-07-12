import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkDeleteParents } from "../../services/parent";

export const useBulkDeleteParents = () => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:bulkDeleteParents,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["parents"]})
         }
     })
}
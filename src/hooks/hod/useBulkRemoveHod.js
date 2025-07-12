import { bulkRemoveHod } from "../../services/hod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useBulkRemoveHod = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:bulkRemoveHod,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["hods"] })
         }
    })
}
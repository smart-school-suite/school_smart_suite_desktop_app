import { bulkRemoveHos } from "../../services/hos";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useBulkRemoveHos = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:bulkRemoveHos,
        onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["hos"] })
        }
    })
}
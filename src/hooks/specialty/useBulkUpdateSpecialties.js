import { bulkUpdateSpecialty } from "../../services/specialty";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useBulkUpdateSpecialties = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:bulkUpdateSpecialty,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["specialties"] })
         }
    })
}
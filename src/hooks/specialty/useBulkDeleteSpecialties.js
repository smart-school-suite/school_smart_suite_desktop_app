import { bulkDeleteSpecialty } from "../../services/specialty";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useBulkDeleteSpecialty = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:bulkDeleteSpecialty,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["specialties"] })
         }
    })
}
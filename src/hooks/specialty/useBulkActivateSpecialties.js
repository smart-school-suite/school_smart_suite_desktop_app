import { bulkActivateSpecialty } from "../../services/specialty";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useBulkActivateSpecialty = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:bulkActivateSpecialty,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["specialties"] })
         }
    })
}
import { deactivateSpecialty } from "../../services/specialty";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useBulkDeactivateSpecialty = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:deactivateSpecialty,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["specialties"] })
         }
    })
}
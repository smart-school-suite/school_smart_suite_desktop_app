import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSpecialty } from "../../services/specialty";

export const useDeleteSpecialty = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:deleteSpecialty,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["specialties"] })
         }
    })
}
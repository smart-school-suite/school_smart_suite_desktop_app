import { activateSpecialty } from "../../services/specialty";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useActivateSpecialty = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:(specialtyId) => activateSpecialty(specialtyId),
         onSuccess:(specialtyId) => {
            queryClient.invalidateQueries({ queryKey:["specialties"] })
            queryClient.removeQueries({ queryKey:["specialty", specialtyId] })
         }
    })
}
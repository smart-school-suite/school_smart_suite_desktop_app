import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deactivateSpecialty } from "../../services/specialty";

export const useDeactivateSpecialty = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:(specialtyId) => deactivateSpecialty(specialtyId),
         onSuccess:(specialtyId) => {
            queryClient.invalidateQueries({ queryKey:["specialties"] })
            queryClient.removeQueries({ queryKey:["specialty", specialtyId] })
         }
    })
}
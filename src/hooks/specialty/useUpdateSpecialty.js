import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSpecialty } from "../../services/specialty";

export const useUpdateSpecialty = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:({ specialtyId, updateData }) => updateSpecialty(specialtyId, updateData),
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["specialties"] })
         }
    })
}
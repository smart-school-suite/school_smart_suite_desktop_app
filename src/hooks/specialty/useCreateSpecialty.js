import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSpecialty } from "../../services/specialty";

export const useCreateSoecialty = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:createSpecialty,
        onSuccess:() => {
             queryClient.invalidateQueries({ queryKey:["specialties"] })
        }
    })
}
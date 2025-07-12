import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeHeadOfSpecialty } from "../../services/hos";

export const useRemoveHos = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn: removeHeadOfSpecialty,
         onSuccess:(hodId) => {
            queryClient.removeQueries({ queryKey:["hos", hodId] })
            queryClient.invalidateQueries({ queryKey:["hos"]})
         }
    })
}
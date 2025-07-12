import { useMutation, useQueryClient } from "@tanstack/react-query";
import { assignHeadOfSpecialty } from "../../services/hos";

export const useAssignHos = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:assignHeadOfSpecialty,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["hos"] })
         }
    })
}
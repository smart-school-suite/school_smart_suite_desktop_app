import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createParent } from "../../services/parent";

export const useCreateParent = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:createParent,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["parents"]})
         }
    })
}
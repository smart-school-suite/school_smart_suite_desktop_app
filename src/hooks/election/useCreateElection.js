import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createElection } from "../../services/election";

export const useCreateElection = () => { 
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:createElection,
         onSuccess: () => {
             queryClient.invalidateQueries({ queryKey:["elections"]})
         }
    })
}
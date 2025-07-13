import { useMutation, useQueryClient } from "@tanstack/react-query";
import { payResit } from "../../services/studentResit";

export const usePayResit = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:payResit,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["studentResits"] })
            queryClient.invalidateQueries({ queryKey:["resitTransactions"] })
         }
    })
}
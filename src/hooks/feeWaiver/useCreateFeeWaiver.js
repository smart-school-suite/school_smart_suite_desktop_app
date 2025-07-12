import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFeeWaiver } from "../../services/FeeWaiver";

export const useCreateFeeWaiver = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:createFeeWaiver,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["feewaivers"]})
         }
    })
}
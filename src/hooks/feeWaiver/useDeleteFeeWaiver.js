import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFeeWaiver } from "../../services/FeeWaiver";

export const useDeleteFeeWaiver = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:deleteFeeWaiver,
         onSuccess:() => {
            queryClient.invalidateQueries({queryKey:["feewaivers"]})
         }
    })
}
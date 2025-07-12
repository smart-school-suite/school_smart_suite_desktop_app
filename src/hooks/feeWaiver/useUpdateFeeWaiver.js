import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFeeWaiver } from "../../services/FeeWaiver";

export const useUpdateFeeWaiver = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:({feeWaiverId, updateData }) => updateFeeWaiver(feeWaiverId, updateData),
        onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["feewaivers"] })
        }
    })
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFeeSchedule } from "../../services/feeSchedule";

export const useDeleteFeeSchedule = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:deleteFeeSchedule,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["feeSchedules"] })
         }
    })
}
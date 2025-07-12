import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFeeScheduleSlots } from "../../services/feeSchedule";

export const useCreateFeeScheduleSlots = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:createFeeScheduleSlots,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["feeSchedules"] })
         }
    })
}
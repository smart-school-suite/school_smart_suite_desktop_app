import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFeeScheduleSlots } from "../../services/feeSchedule";

export const useUpdateFeeScheduleSlots = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:({ feeScheduleId, updateData }) => updateFeeScheduleSlots(feeScheduleId, updateData),
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["feeSchedules"] })
         }
    })
}
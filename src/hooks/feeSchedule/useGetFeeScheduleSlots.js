import { useQuery } from "@tanstack/react-query";
import { getFeeScheduleSlots } from "../../services/feeSchedule";

export const useGetFeeScheduleSlots = (feeScheduleId, options = {}) => {
    return useQuery({
         queryKey:["feeScheduleSlots", feeScheduleId],
         queryFn:() => getFeeScheduleSlots(feeScheduleId),
         enabled: Boolean(feeScheduleId),
         ...options,
    })
}

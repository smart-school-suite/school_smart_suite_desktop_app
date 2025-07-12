import { useQuery } from "@tanstack/react-query";
import { getFeeScheduleSlots } from "../../services/feeSchedule";

export const useGetFeeScheduleSlots = (feeScheduleId) => {
    return useQuery({
         queryKey:["feeScheduleSlots"],
         queryFn:getFeeScheduleSlots(feeScheduleId)
    })
}
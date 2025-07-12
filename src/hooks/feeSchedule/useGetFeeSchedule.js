import { useQuery } from "@tanstack/react-query";
import { getFeeSchedule } from "../../services/feeSchedule";

export const useGetFeeSchedule = () => {
    return useQuery({
         queryKey:["feeSchedules"],
         queryFn:getFeeSchedule
    })
}
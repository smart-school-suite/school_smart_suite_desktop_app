import { useQuery } from "@tanstack/react-query";
import { getAllFeeWaivers } from "../../services/feeWaiver";

export const useGetAllFeeWaivers = () => {
    return useQuery({
         queryKey:["feewaivers"],
         queryFn:getAllFeeWaivers
    })
}
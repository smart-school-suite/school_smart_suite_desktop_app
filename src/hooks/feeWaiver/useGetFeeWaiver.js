import { useQuery } from "@tanstack/react-query";
import { getAllFeeWaivers } from "../../services/FeeWaiver";

export const useGetAllFeeWaivers = () => {
    return useQuery({
         queryKey:["feewaivers"],
         queryFn:getAllFeeWaivers
    })
}
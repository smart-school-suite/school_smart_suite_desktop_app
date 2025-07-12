import { useQuery } from "@tanstack/react-query";
import { getHosDetails } from "../../services/hos";

export const useGetHosDetails = (hosId) => {
    return useQuery({
         queryKey:["hos", hosId],
         queryFn:getHosDetails(hosId)
    })
}
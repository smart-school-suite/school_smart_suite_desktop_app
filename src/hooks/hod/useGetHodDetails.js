import { getHodDetails } from "../../services/hod";
import { useQuery } from "@tanstack/react-query";

export const useGetHodDetails = (hodId) => {
    return useQuery({
         queryKey:["hod", hodId],
         queryFn:getHodDetails(hodId)
    })
}
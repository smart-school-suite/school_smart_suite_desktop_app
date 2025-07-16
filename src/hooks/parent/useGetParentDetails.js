import { getParentDetails } from "../../services/parent";
import { useQuery } from "@tanstack/react-query";

export const useGetParentDetails = (parentId) => {
    return useQuery({
         queryKey:["parentDetails"],
         queryFn:() => getParentDetails(parentId)
    })
}
import { useQuery } from "@tanstack/react-query";
import { getTargetAudience } from "../../services/announcement";
export const useGetTargetAudience = () => {
     return useQuery({
         queryKey:["targetAudience"],
         queryFn:() => getTargetAudience()
     })
}
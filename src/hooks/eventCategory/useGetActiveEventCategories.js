import { getActiveEventCategories } from "../../services/eventCategory";
import { useQuery } from "@tanstack/react-query";

export const useGetActiveEventCategories = () => {
     return useQuery({
         queryKey:["activeEventCategories"],
         queryFn:getActiveEventCategories
     })
}
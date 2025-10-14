import { useQuery } from "@tanstack/react-query";
import { getEventCategories } from "../../services/eventCategory";
export const useGetEventCategories = () => {
    return useQuery({
         queryKey: ["eventCategories"],
         queryFn:getEventCategories
    })
}
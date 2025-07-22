import { useQuery } from "@tanstack/react-query";
import { getEventCategoryByStatus } from "../../services/eventCategory";
export const useGetEventCategoryByStatus = (status) => {
    return useQuery({
         queryKey: ["eventCategories", status],
         queryFn: () => getEventCategoryByStatus(status),
         enabled: !!status,
    })
}
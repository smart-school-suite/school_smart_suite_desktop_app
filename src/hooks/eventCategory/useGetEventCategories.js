import { useQuery } from "@tanstack/react-query";
import { getEventCategoryByStatus } from "../../services/event";

export const useGetEventCategoryByStatus = (status) => {
    return useQuery({
         queryKey: ["eventCategories", status],
         queryFn: () => getEventCategoryByStatus(status),
         enabled: !!status,
    })
}
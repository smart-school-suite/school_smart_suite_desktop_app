import { useQuery } from "@tanstack/react-query";
import { getExpiredSchoolEventsByCategory } from "../../services/schoolEvent";

export const useGetExpiredSchoolEventsByCategory = (eventCategoryId) => {
     return useQuery({ 
        queryKey:["expiredSchoolEvent", eventCategoryId],
        queryFn:() => getExpiredSchoolEventsByCategory(eventCategoryId)
     })
}
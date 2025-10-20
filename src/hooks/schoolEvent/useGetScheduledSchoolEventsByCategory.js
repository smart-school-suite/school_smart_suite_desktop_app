import { getScheduledSchoolEventsByCategory } from "../../services/schoolEvent";
import { useQuery } from "@tanstack/react-query";

export const useGetScheduledSchoolEventsByCategory = (eventCategoryId) => {
     return useQuery({
         queryKey:["scheduledSchoolEvent", eventCategoryId],
         queryFn:() => getScheduledSchoolEventsByCategory(eventCategoryId)
     })
}
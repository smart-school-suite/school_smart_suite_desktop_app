import { getDraftSchoolEventsByCategory } from "../../services/schoolEvent";
import { useQuery } from "@tanstack/react-query";

export const useGetDraftSchoolEventsByCategory = (eventCategoryId) => {
     return useQuery({
        queryKey:["draftSchoolEvent", eventCategoryId],
        queryFn:() => getDraftSchoolEventsByCategory(eventCategoryId)
     })
}
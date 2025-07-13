import { getSchoolEventByCategory } from "../../services/schoolEvent";
import { useQuery } from "@tanstack/react-query";

export const useGetSchoolEventsByCategory = (categoryId) => {
     return useQuery({
         queryKey:["schoolEventByCategory", categoryId],
         queryFn:getSchoolEventByCategory(categoryId)
     })
}
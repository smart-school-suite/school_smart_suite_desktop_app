import { useQuery } from "@tanstack/react-query";
import { getSchoolEventDetails } from "../../services/schoolEvent";

export const useGetSchoolEventDetails = (schoolEventId) => {
     return useQuery({
         queryKey:["schoolEvent", schoolEventId],
         queryFn:getSchoolEventDetails(schoolEventId)
     })
}
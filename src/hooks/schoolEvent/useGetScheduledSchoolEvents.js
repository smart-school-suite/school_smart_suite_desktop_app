import { getScheduledSchoolEvents } from "../../services/schoolEvent";
import { useQuery } from "@tanstack/react-query";

export const useGetScheduledSchoolEvents = () => {
     return useQuery({
         queryKey:["scheduledSchoolEvent"],
         queryFn: getScheduledSchoolEvents
     })
}
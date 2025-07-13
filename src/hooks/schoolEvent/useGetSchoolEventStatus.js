import { useQuery } from "@tanstack/react-query";
import { getSchoolEventByStatus } from "../../services/schoolEvent";

export const useGetSchoolEventStatus = (status) => {
    return useQuery({
         queryKey:["schoolEventsStatus", status],
         queryFn:getSchoolEventByStatus(status)
    })
} 
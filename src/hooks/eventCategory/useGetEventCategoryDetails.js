import { useQuery } from "@tanstack/react-query";
import { getEventCategoryDetails } from "../../services/eventCategory";

export const useGetEventCategoryDetails = (eventCategoryId) => {
     return useQuery({
         queryKey:["eventCategoryDetails", eventCategoryId],
         queryFn:() => getEventCategoryDetails(eventCategoryId),
         enabled:!!eventCategoryId
     })
}
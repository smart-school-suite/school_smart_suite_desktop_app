import { useQuery } from "@tanstack/react-query";
import { getEventTags } from "../../services/schoolEvent";

export const useGetEventTags = () => {
     return useQuery({
         queryKey:["schoolEventTags"],
         queryFn:getEventTags
     })
}
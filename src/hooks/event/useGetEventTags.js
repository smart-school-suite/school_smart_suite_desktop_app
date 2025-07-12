import { useQuery } from "@tanstack/react-query";
import { getEventTags } from "../../services/event";

export const useGetEventTags = () => {
    return useQuery({
         queryFn:getEventTags,
         queryKey:["eventTags"]
    })
}
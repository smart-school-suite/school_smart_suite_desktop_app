import { useQuery } from "@tanstack/react-query";
import { getAnnouncementTags } from "../../services/announcement";

export const useGetTags = () => {
     return useQuery({
         queryKey:["tags"],
         queryFn: () => getAnnouncementTags()
     })
}
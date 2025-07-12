import { useQuery } from "@tanstack/react-query";
import { getAnnouncementTags } from "../../services/announcement";

export const useGetAnnouncementTags = () => {
     return useQuery({
         queryKey: ['announcementTags'],
         queryFn: getAnnouncementTags,
    });
}
import { useQuery } from "@tanstack/react-query";
import { getAnnouncementReadUnreadList } from "../../services/announcement";

export const useGetAnnouncementReadUnreadList = (announcementId) => {
     return useQuery({ 
         queryKey:["announcementReadUnReadList", announcementId],
         queryFn:() => getAnnouncementReadUnreadList(announcementId)
     })
}
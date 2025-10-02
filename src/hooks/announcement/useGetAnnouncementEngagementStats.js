import { useQuery } from "@tanstack/react-query";
import { getAnnouncementEngagementStats } from "../../services/announcement";

export const useGetAnnouncementEngagementStats = (announcementId) => {
     return useQuery({
         queryKey:["announcementEngagement", announcementId],
         queryFn:() => getAnnouncementEngagementStats(announcementId)
     })
}
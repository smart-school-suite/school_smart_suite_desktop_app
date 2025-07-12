import { useQuery } from "@tanstack/react-query";
import { getAnnouncementDetails } from "../../services/announcement";
export const useGetAnnouncementByStatus = (announcementId) => {
    return useQuery({
             queryKey: ['announcement', announcementId],
             queryFn: () => getAnnouncementDetails(announcementId),
             enabled: !!announcementId,
   });
}
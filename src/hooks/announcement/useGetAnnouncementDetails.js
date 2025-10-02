import { useQuery } from "@tanstack/react-query";
import { getAnnouncementDetails } from "../../services/announcement";
export const useGetAnnouncementDetails = (announcementId) => {
    return useQuery({
             queryKey: ['announcement', announcementId],
             queryFn: () => getAnnouncementDetails(announcementId),
             enabled: !!announcementId,
   });
}
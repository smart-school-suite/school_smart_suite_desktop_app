import { useQuery } from "@tanstack/react-query";
import { getAnnouncementByStatus } from "../../services/announcement";

export const useGetAnnouncementByStatus = (status) => {
    return useQuery({
             queryKey: ['announcement', status],
             queryFn: () => getAnnouncementByStatus(studentId),
             enabled: !!status,
   });
}
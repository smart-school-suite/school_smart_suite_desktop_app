import { useQuery } from "@tanstack/react-query";
import { getAnnouncementStats } from "../../services/announcement";

export const useGetAnnouncementStatus = (year) => {
     return useQuery({
         queryKey:["announcementStats", year],
         queryFn:() => getAnnouncementStats(year)
     })
}
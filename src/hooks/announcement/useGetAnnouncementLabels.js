import { useQuery } from "@tanstack/react-query";
import { getAnnouncementLabels } from "../../services/announcement";

export const useGetAnnouncementLabels = () => {
      return useQuery({
              queryKey: ['announcementLabels'],
              queryFn: () => getAnnouncementLabels(),
    });
}
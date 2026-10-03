import { useQuery } from "@tanstack/react-query";
import { getAnnouncementSummary } from "../../services/announcement";

export const useGetAnnouncementSummary = () => {
  return useQuery({
    queryKey: ["announcement-summary"],
    queryFn: () => getAnnouncementSummary(),
  });
};

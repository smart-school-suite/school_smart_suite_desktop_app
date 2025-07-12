import { useQuery } from "@tanstack/react-query";
import { getAnnouncementCategories } from "../../services/announcement";

export const useGetAnnouncementCategories = () => {
  return useQuery({
    queryKey: ["announcementCategories"],
    queryFn: getAnnouncementCategories,
  });
};

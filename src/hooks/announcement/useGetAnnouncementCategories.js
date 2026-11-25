import { useQuery } from "@tanstack/react-query";
import { getAnnouncementCategories } from "../../services/announcement";
import { retryUnlessEmpty } from "../../utils/query/emptyList";

export const useGetAnnouncementCategories = () => {
  return useQuery({
    queryKey: ["announcementCategories"],
    queryFn:() =>  getAnnouncementCategories(),
    // No categories is a 404: show the empty state at once, don't retry it.
    retry: retryUnlessEmpty,
  });
};

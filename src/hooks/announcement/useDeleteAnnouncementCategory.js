import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAnnouncementCategory } from "../../services/announcement";

export const useDeleteAnnouncementCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAnnouncementCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcementCategories"] });
    },
  });
};

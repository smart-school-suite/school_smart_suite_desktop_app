import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAnnouncementTag } from "../../services/announcement";

export const useUpdateAnnouncementTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updateData }) => updateAnnouncementTag(id, updateData),
    onSuccess: (updatedTag) => {
      queryClient.invalidateQueries({ queryKey: ["announcementTags"] });
    },
  });
};

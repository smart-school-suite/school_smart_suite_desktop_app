import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAnnouncement } from "../../services/announcement";

export const useDeleteAnnouncement = () => {
     const queryClient = useQueryClient();
     return useMutation({
          mutationFn:deleteAnnouncement,
          onSuccess:(data, deletedAnnouncementId) => {
              queryClient.invalidateQueries({ queryKey: ['announcements'] }),
              queryClient.removeQueries({ queryKey: ['announcement', deletedAnnouncementId] })
          }
     });
}
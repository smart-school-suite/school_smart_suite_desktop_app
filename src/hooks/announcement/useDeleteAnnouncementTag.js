import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAnnouncementTag } from "../../services/announcement";

export const useDeleteAnnouncementTag = () => {
   const queryClient = useQueryClient();
   return useMutation({
       mutationFn:deleteAnnouncementTag,
       onSuccess: () => {
           queryClient.invalidateQueries({ queryKey: ['announcementTags']});
       }
   });
}
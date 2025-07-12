import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnnouncementTag } from "../../services/announcement";

export const useCreateAnnouncementTag = () => {
     const queryClient = useQueryClient();
     return useMutation({
        mutationFn:createAnnouncementTag,
         onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['announcementTags'] })
        } 
     });
}
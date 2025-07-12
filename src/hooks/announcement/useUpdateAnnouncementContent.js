import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAnnouncementContent } from "../../services/announcement";

export const useUpdateAnnouncementContent = () => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn: ({ id, updateData }) => updateAnnouncementContent(id, updateData),
         onSuccess: (updatedContent) => {
         queryClient.invalidateQueries({ queryKey: ['announcement', updatedContent.status] });
        },
     })
}
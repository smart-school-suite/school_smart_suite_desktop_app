import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAnnouncementCategory } from "../../services/announcement";

export const useUpdateAnnouncementCategory = () => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:({ id, updateData }) => updateAnnouncementCategory(id, updateData),
         onSuccess: () => {
             queryClient.invalidateQueries({ queryKey: ['announcementCategories'] })
         }
     });
}
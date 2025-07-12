import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnnouncementCategory } from "../../services/announcement";

export const useCreateAnnouncementCategory = () => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:createAnnouncementCategory,
         onSuccess: () => {
             queryClient.invalidateQueries({ queryKey:["announcementCategories"] })
         } 
     });
}
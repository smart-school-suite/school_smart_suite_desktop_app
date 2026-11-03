import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnnouncementTag } from "../../services/announcement";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useCreateAnnouncementTag = (handleClose) => {
     const queryClient = useQueryClient();
     return useMutation({
        mutationFn:createAnnouncementTag,
         onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['announcementTags'] })
             
            if(handleClose){
               handleClose();
            }

            toast.custom(
               <ToastSuccess 
                  title={"Tag Created"}
                  description={"Announcement Tag Created Successfully"}
               />
            )
        },
     });
}
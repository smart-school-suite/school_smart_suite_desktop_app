import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAnnouncementTag } from "../../services/announcement";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useDeleteAnnouncementTag = (handleClose) => {
   const queryClient = useQueryClient();
   return useMutation({
       mutationFn:deleteAnnouncementTag,
       onSuccess: () => {
           queryClient.invalidateQueries({ queryKey: ['announcementTags']});

           if(handleClose){
            handleClose();
           }

           toast.custom(
              <ToastSuccess 
                 title={"Delete Successfull"}
                 description={"Announcement Tag Deleted Successfully"}
              />
           )
       },
   });
}
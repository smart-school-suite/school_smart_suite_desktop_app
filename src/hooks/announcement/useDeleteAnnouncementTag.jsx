import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAnnouncementTag } from "../../services/announcement";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
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
       onError:() => {
           toast.custom(
             <ToastDanger 
                title={"Delete Failed"}
                description={"Failed to delete Announcement Tag Due to an error please try again"}
             />
           )
       }
   });
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDraftAnnouncement } from "../../services/announcement";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useUpdateAnnouncementDraft = (announcementId, handleClose) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:({ updateData }) => updateDraftAnnouncement(updateData),
         onSuccess:() => {
             queryClient.invalidateQueries({ queryKey: ['announcement', "scheduled"]});
             queryClient.invalidateQueries({ queryKey: ['announcement', "active"]});
             queryClient.invalidateQueries({ queryKey: ['announcement', "draft"]});
             queryClient.invalidateQueries({ queryKey:['announcement', announcementId] });

             if(handleClose){
                 handleClose();
             }

             toast.custom(
                  <ToastSuccess 
                  title={"Update Successfull"}
                  description={"Announcement Updated  Successfully"}
                />
             )
         },
         onError:() => {
             toast.custom(
                <ToastWarning 
                   title={error.response.data.errors.title}
                   description={error.response.data.errors.description}
                />
           )
         }
    })
}
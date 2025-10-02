import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAnnouncementContent } from "../../services/announcement";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useUpdateAnnouncementContent = (handleClose, announcementId) => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn: ({ id, updateData }) => updateAnnouncementContent(id, updateData),
         onSuccess: () => {
           queryClient.invalidateQueries({ queryKey: ['announcement', "active"]});
           queryClient.invalidateQueries({ queryKey:['announcement', announcementId] });
            if(handleClose){ 
               handleClose();
            }

            toast.custom(
                <ToastSuccess 
                  title={"Update Successfull"}
                  description={"Announcement Content Updated Successfully"}
                />
            )
        },
        onError:(error) => {
           toast.custom(
                <ToastWarning 
                   title={error.response.data.errors.title}
                   description={error.response.data.errors.description}
                />
           )
        }
     })
}
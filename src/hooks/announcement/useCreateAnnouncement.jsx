import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnnouncement } from "../../services/announcement";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
export const useCreateAnnouncement = (handleClose) => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:createAnnouncement,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['announcements'] })
            if(handleClose){
                 handleClose();
            }

            toast.custom(
                 <ToastSuccess 
                   title={"Announcement Created"}
                   description={"Announcement Created Successfully And Details will be made available to the reciepients"}
                 />
            )
        },
        onError:(error) => {
             toast.custom(
                 <ToastDanger 
                  title={error.response.data.errors.title}
                  description={error.response.data.errors.description}
                 />
             )
        }
     });
}
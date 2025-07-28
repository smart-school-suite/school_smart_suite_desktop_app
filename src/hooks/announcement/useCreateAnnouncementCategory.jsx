import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnnouncementCategory } from "../../services/announcement";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useCreateAnnouncementCategory = (handleClose) => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:createAnnouncementCategory,
         onSuccess: () => {
             queryClient.invalidateQueries({ queryKey:["announcementCategories"] })

             if(handleClose){
                handleClose();
             }

             toast.custom(
                <ToastSuccess 
                   title={"Category Created"}
                   description={"Announcement Category Created Successfully"}
                />
             )
         },
         onError:() => {
             toast.custom(
                <ToastDanger 
                  title={"Creation Failed"}
                  description={"Failed to create announcement category due to an error please try again"}
                />
             )
         } 
     });
}
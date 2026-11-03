import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAnnouncementCategory } from "../../services/announcement";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useUpdateAnnouncementCategory = (handleClose) => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:({ categoryId, updateData }) => updateAnnouncementCategory(categoryId, updateData),
         onSuccess: () => {
             queryClient.invalidateQueries({ queryKey: ['announcementCategories'] })
             if(handleClose){
                handleClose();
             }

             toast.custom(
                <ToastSuccess 
                  title={"Update Successfull"}
                  description={"Announcement Category Update Successfully"}
                />
             )
         },
     });
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAnnouncementCategory } from "../../services/announcement";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useDeleteAnnouncementCategory = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAnnouncementCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcementCategories"] });
      if(handleClose){
         handleClose();
      }

      toast.custom(
         <ToastSuccess 
            title={"Delete Successfull"}
            description={"Announcement Category Deleted Successfully"}
         />
      )
    },
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAnnouncementTag } from "../../services/announcement";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useUpdateAnnouncementTag = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ tagId, updateData }) => updateAnnouncementTag(tagId, updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcementTags"] });
      if(handleClose){
         handleClose();
      }

      toast.custom(
        <ToastSuccess 
          title={"Update Successfull"}
          description={"Announcement Tag Updated Successfully"}
        />
      )
    },
    onError:() => {
       toast.custom(
         <ToastSuccess 
           title={"Update Failed"}
           description={"Failed to update Announcement tag due to an error please try again"}
         />
       )
    }
  });
};

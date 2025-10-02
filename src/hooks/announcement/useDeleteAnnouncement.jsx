import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAnnouncement } from "../../services/announcement";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastWarning from "../../components/Toast/ToastWarning";
export const useDeleteAnnouncement = (
  handleClose,
  status = "active",
  announcementId
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAnnouncement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements", status] }),
        queryClient.removeQueries({
          queryKey: ["announcement", announcementId],
        });
      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Delete Successfull"}
          description={"Announcement Deleted Successfully"}
        />
      );
    },
    onError: () => {
      toast.custom(
        <ToastWarning
          title={error.response.data.errors.title}
          description={error.response.data.errors.description}
        />
      );
    },
  });
};

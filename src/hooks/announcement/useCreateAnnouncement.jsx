import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnnouncement } from "../../services/announcement";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
import { resetCreateAnnouncement } from "../../Slices/announcement/announcementSlice";
import { useDispatch } from "react-redux";
export const useCreateAnnouncement = (handleClose, handleCloseDrawer) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: createAnnouncement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
      queryClient.invalidateQueries({ queryKey: ["announcement-summary"] });
      if (handleClose) {
        handleClose();
      }

      if (handleCloseDrawer) {
        handleCloseDrawer();
      }
      toast.custom(
        <ToastSuccess
          title={"Announcement Created"}
          description={
            "Announcement Created Successfully And Details will be made available to the reciepients"
          }
        />,
      );
      dispatch(resetCreateAnnouncement());
    },
    onError: (error) => {
      toast.custom(
        <ToastDanger
          title={error.response.data.errors.title}
          description={error.response.data.errors.description}
        />,
      );
    },
  });
};

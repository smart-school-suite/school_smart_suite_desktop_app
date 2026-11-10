import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSchoolEvent } from "../../services/schoolEvent";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { useDispatch } from "react-redux";
import { resetCreateEvent } from "../../Slices/schoolEvent/schoolEventSlice";
export const useCreateSchoolEvent = (handleClose, handleCloseDrawer) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: createSchoolEvent,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["schoolEvents"] });
      queryClient.invalidateQueries({ queryKey: ["schoolEventSummary"] });
      if (handleClose) {
        handleClose();
      }
      if (handleCloseDrawer) {
        handleCloseDrawer();
      }
      const isDraft = variables?.status === "draft";
      toast.custom(
        <ToastSuccess
          title={isDraft ? "Saved To Draft" : "School Event Created"}
          description={
            isDraft
              ? "School Event Saved To Draft Successfully"
              : "School Event Created Successfully And Invitees will be notified"
          }
        />,
      );
      dispatch(resetCreateEvent());
    },
  });
};
